import { Box, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import SingleChat from "../miscellaneous/SingleChat";

function ChatBox() {
  const {selectedChat }=useSelector(state=>state.chat);
  return (
    <Box
    display={{base:selectedChat?"flex":"none",md:"flex"}}
    alignItems="center"
    flexDir={"column"}
    p={3}
    backgroundColor={"white"}
    borderRadius={"lg"}
    borderWidth={"1px"}
    w={{base:"100%",md:"68%"}}
    fontFamily={"Work sans"}
    >
        {selectedChat?<SingleChat/>:(<Box
       display={"flex"}
       justifyContent={"center"}
       alignItems="center"
       h={"100%"}
       >
         <Text fontSize={"2xl"} fontFamily={"Work sans"} pb={3}>Click on the user to start the chat</Text>
        </Box>)}
    </Box>
  )
}

export default ChatBox