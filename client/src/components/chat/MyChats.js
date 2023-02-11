import { AddIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button,  Stack, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import {useLazyFetchChatsQuery} from '../../services/chat/chatServices'
import { useDispatch } from 'react-redux'
import {setChat,setSelectedChat} from '../../states/chat/chatState'
import CreateGroupModal from './CreateGroupModal'
import { getSender } from '../../config/chatConfig'
import { useEffect } from 'react'

function MyChats() {
  const loggedUser=JSON.parse(localStorage.getItem("userdata"))
  const dispatch=useDispatch();
  const {chats,selectedChat}=useSelector(state=>state.chat);
  const [fetchChats]=useLazyFetchChatsQuery();
   async function fetchAllChats(){
       await fetchChats().then((res)=>{
          const {data,isSuccess}=res;
          if(isSuccess){
            dispatch(setChat({data}))
           }
       })
   }

   useEffect(()=>{
      fetchAllChats();
      // eslint-disable-next-line
   },[useLazyFetchChatsQuery])
      
  return (
    <>
      <Box 
      display={{ base:selectedChat?"none":"flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      fontFamily={"Work sans"}
      // overflow={"scroll"}
      >
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"space-between"}
            p={3}
            w="100%"
          >
            <Text fontWeight={"bold"}>Chats</Text>
            <CreateGroupModal>
            <Button variant={"ghost"}>
                <Text mr={2}>Create Group Chat</Text>
                <AddIcon/>
            </Button>
            </CreateGroupModal>
          </Box>
          <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="scroll"
      >
        <Stack overflowY={"hidden"}>
          {chats.map(chat=>{
            return(
              
              <Box
              display={"flex"}
              gap={2}
              alignItems="center"
              onClick={() => dispatch(setSelectedChat({chat}))}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                _hover={{
                  backgroundColor:selectedChat!==chat?"blue.50":"",
                  color:selectedChat!==chat?"black":""
                }}
              >
                <Avatar
                 size={"md"}
                 name={getSender(loggedUser,chat.users).name}
                 src={getSender(loggedUser,chat.users).pic} 
                 />
                 <Box display={"flex"} flexDir={"column"}>
                   {chat.isGroupChat?<Text fontWeight={"bold"}>{chat.chatName}</Text>:<Text fontWeight={"bold"}>{getSender(loggedUser,chat.users).name}</Text>}
                   {chat.latestMessage&&<Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>}
                  </Box>
              </Box>
            )
          })}
        </Stack>
      </Box>
      </Box>
    </>
  )
}

export default MyChats