import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { useState } from "react";
import ChatLoading from "./ChatLoading";
import UserBadgeItem from "../miscellaneous/UserBadgeItem";
import SearchResult from '../miscellaneous/SearchResults'
import { useLazySearchUsersQuery } from "../../services/user/userServices";
import { useCraeteGroupMutation } from "../../services/chat/chatServices";


function CreateGroupModal({children}) {
  const [searchApi]=useLazySearchUsersQuery()
  const [craeteGroup]=useCraeteGroupMutation()
  const [loading,setLoading]=useState(false)
  const [selectedUser,setSelectedUser]=useState([]);
  const [name,setName]=useState()
  const [search,setSearch]=useState()
  const [searchResult,setSearchResult]=useState([])
  const {isOpen,onClose,onOpen}=useDisclosure();
  const toast=useToast();


  const handelSearch=async(query)=>{
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
  const handelDelete=(userToRemove)=>{
       setSelectedUser(selectedUser.filter(sel=>sel._id!==userToRemove._id));
  }
  const handelGroup=(userToAdd)=>{
       if(selectedUser.includes(userToAdd)){
         toast({
           title:"User Already Added",
           isClosable:true,
           position:"top",
           duration:3000,
         })
         return;
       }

       setSelectedUser([...selectedUser,userToAdd]);
  }

  const handleSubmit=()=>{
    if(!name){
      toast({
        title:"Enter Name to Create Group",
        status:"warning",
        isClosable:true,
        duration:3000,
        position:"top"
      })
      return;
    }
    
    if(name){
      if(selectedUser.length<2){
        toast({
          title:"Minimam 3 Member Added",
          status:"warning",
          isClosable:true,
          duration:3000,
          position:"top"
        })
        return;
      }

      craeteGroup({
        name,
        users:JSON.stringify(selectedUser.map(user=>user._id))
      }).then(res=>{
         if(res.data){
           console.log(res.data);
         }
         if(res.error){
           console.log(res.error)
         }
      })
    }
    
    onClose();
    setSearchResult([]);
    setSelectedUser([]);
    setName();
  }

  const handleCancel=()=>{
    setName();
    setSearchResult();
    setSelectedUser([]);
    onClose();
  }

  return (
    <>
          <span onClick={onOpen}>{children}</span>

      <Modal  isCentered size={"lg"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={"Work sans"}>
          <ModalHeader>
            <Text display={"flex"} justifyContent="center" fontFamily={"Work sans"} >Create Group</Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
              <FormControl mb={3}>
                 <Input placeholder="Group Name" type={"name"} value={name} onChange={e=>setName(e.target.value)}  />
                </FormControl>
                <FormControl mb={3}>
                 <Input placeholder="Search User to Add" type={"search"}
                 value={search}
                 onChange={(e)=>handelSearch(e.target.value)}
                 />
                </FormControl>
                <Box display={"flex"} gap={3}>{selectedUser.map(user=>{
                return <UserBadgeItem
                key={user._id}
                user={user}
                handelFunction={()=>handelDelete(user)}
                />
               })}</Box>

               {loading?<ChatLoading/>:(
                 searchResult?.slice(0,4).map((user)=>{
                   return <SearchResult
                    key={user._id}
                    user={user}
                    handleFunction={()=>handelGroup(user)}
                   />
                 })
               )}


          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Craete
            </Button>
            <Button variant='ghost' onClick={handleCancel}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateGroupModal