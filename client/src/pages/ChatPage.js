import { Box } from "@chakra-ui/react";
import ChatBox from "../components/chat/ChatBox";
import Header from "../components/Header/Header";
import MyChats from "../components/chat/MyChats";


function ChatPage() {

  return (
    <div style={{width:"100%"}}>
       <Header/>
       <Box
       display={"flex"}
       justifyContent="space-between"
       w={"100%"}
       h="88vh"
       p={"10px"}
       >
        <MyChats/>
        <ChatBox/>      
       </Box>
    </div>
  )
}

export default ChatPage;