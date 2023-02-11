import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { useState } from "react"
import SearchResults from "./SearchResults"
import UserBadgeItem from "./UserBadgeItem"
import { useLazySearchUsersQuery } from "../../services/user/userServices"
import ChatLoading from "../chat/ChatLoading"


function UpdateChatModal({groupChat,children}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupName,setGroupName]=useState(groupChat.chatName);
    const [selectedUser,setSelectedUser]=useState([].concat(groupChat.users));
    const [search,setSearch]=useState();
    const [loading,setLoading]=useState(false);
    const [searchResult,setSearchResult]=useState([]);
    const [searchApi]=useLazySearchUsersQuery();
    const toast=useToast();
    const handleRemove=(userToRemove)=>{
        setSelectedUser(selectedUser.filter(sel=>sel._id!==userToRemove._id));
    }
    const handelSearch=(query)=>{
        setSearch(query);
        if(!query){
          return;
        }
        searchApi(query).then(res=>{
           setLoading(true)
          const {isSuccess,isLoading,data}=res;
          if(!isLoading){
            setLoading(false);
            if(isSuccess){
              setSearchResult(data)
            }
          }
        })
    }
    const handelGroup=(userToAdd)=>{
       selectedUser.forEach(user => {
           if(user._id===userToAdd._id){
            toast({
              title:"User Already Added",
              isClosable:true,
              position:"top",
              duration:3000,
            })
            return;
           }
       });
   
          setSelectedUser([...selectedUser,userToAdd]);
    }
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} justifyContent={"center"}>{groupChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
             <Box display={"flex"} flexFlow={"wrap"} gap={2}>
                {selectedUser.map(user=>{
                  return <UserBadgeItem
                     user={user}
                     key={user._id}
                     handelFunction={()=>handleRemove(user)}
                    />
                })} 
             </Box>
             <FormControl display={"flex"}>
                <Input mb={2} mr={2} placeholder="Enter Name to Update Name" value={groupName} onChange={e=>setGroupName(e.target.value)}  />
                <Button colorScheme={"blue"}>Update</Button>
             </FormControl>
              <FormControl mb={3}>
                <Input placeholder="Search To Add User" value={search} onChange={(e)=>handelSearch(e.target.value)}  />
              </FormControl>
              {loading?<ChatLoading/>:(
                 searchResult?.slice(0,4).map((user)=>{
                   return <SearchResults
                    key={user._id}
                    user={user}
                    handleFunction={()=>handelGroup(user)}
                   />
                 })
               )}
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateChatModal