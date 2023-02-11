import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ViewIcon
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useToast
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux"
// import {setSelectedChat} from '../../states/chat/chatState'
import ProfileModel from "../Header/ProfileModel";
import { getSender } from "../../config/chatConfig";
import UpdateChatModal from "./UpdateChatModal";
import { useLazyGetAllMessageQuery, useSendMessageMutation } from '../../services/message/messageServices'
import { useLazyFetchChatsQuery } from "../../services/chat/chatServices";
import { useEffect, useState } from "react";
import { setChat, setSelectedChat } from '../../states/chat/chatState'
import io from 'socket.io-client'
const socket = io("http://localhost:5000");
let selectedChatCompare;

function SingleChat() {
  const [socketConnected, setSocketConnected] = useState(false)
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { selectedChat } = useSelector(state => state.chat);
  const dispatch = useDispatch();
  const loggedUser = JSON.parse(localStorage.getItem("userdata"));
  const [newMessage, setNewMessage] = useState("");
  const [getAllMessages] = useLazyGetAllMessageQuery();
  const [sendMessageApi] = useSendMessageMutation();
  const [fetchAllChats] = useLazyFetchChatsQuery();

  //make a function to auto scroll down for messaging app in javaScript for react

  const autoScroll = () => {
    const messagesContainer = document.querySelector('#messages-container');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const fetchAllMessages = async () => {
    await getAllMessages(selectedChat._id).then((res) => {
      setLoading(true);
      const { isSuccess, data } = res;
      // console.log(data);
      if (isSuccess) {
        setMessages(data.messages)
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    socket.emit("join-chat-room", selectedChat._id);
    // socket.on("connect", () => setSocketConnected(true));
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetchAllMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat])

  const sendMessage = async () => {
    autoScroll();
    await sendMessageApi({
      chatId: selectedChat._id,
      content: newMessage
    }).then((res) => {
      if (res.data) {
        const { message } = res.data;
        socket.emit("send-message", message);
        setMessages([...messages, message]);
        setNewMessage("");

      }
      if (res.error) {
        toast({
          title: res.error.data.message,
          position: "top",
          duration: 3000,
          isClosable: true,
          status: "error"
        })
      }
    })
  }

  useEffect(() => {
    socket.on("received-message", (message) => {
      if (selectedChat._id !== message.chat._id) {
        // Notification Here
        return;
      }
      else {
        setMessages([...messages, message])
        autoScroll();
      }
    })
  })
  return (
    <>
      <Text display={"flex"} w={"100%"} justifyContent={"space-between"} p={3} alignItems={"center"}>
        <IconButton icon={<ArrowBackIcon />} display={{ base: "flex", md: "none" }} onClick={() => dispatch(setSelectedChat(""))} />
        {selectedChat.isGroupChat ? (
          <>
            <Text fontSize={{ base: "2xl", md: "3xl" }}>{selectedChat.chatName}</Text>
            <UpdateChatModal groupChat={selectedChat} >
              <ViewIcon />
            </UpdateChatModal>
          </>
        ) : (
          <>
            {<Text fontSize={{ base: "2xl", md: "3xl" }} >{getSender(loggedUser, selectedChat.users).name}</Text>}
            <ProfileModel user={getSender(loggedUser, selectedChat.users)}></ProfileModel>
          </>
        )}

      </Text>
      <Box
        display={"flex"}
        flexDir="column"
        h={"100%"}
        w={"100%"}
        backgroundColor={"#E8E8E8"}
        overflowY={"scroll"}
        p={3}
      >
        <Box id="messages-container" overflowY={"scroll"} overflowWrap h={"90%"}>
          {loading ? <Spinner
            h={"20"}
            w="20"
            alignSelf={"center"}
            margin="auto"
          /> : <>
            {messages.map(message => {
              return <Box display={"flex"} justifyContent={message.sender._id === loggedUser._id ? "end" : "flex-start"} m={2} alignItems="center" key={message._id}
              >
                <Avatar mr={1} name={message.sender.name} size={'sm'} />
                <Text bg={message.sender._id === loggedUser._id ? "blue.200" : "blue.400"} p={3} borderRadius={"md"}>{message.content}</Text>
              </Box>
            })}
          </>}
        </Box>
        <FormControl isRequired mt={3} >
          <InputGroup>
            <Input value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Enter Message" variant={"filled"} bg="#E0E0E0" />
            <InputRightElement children={<IconButton onClick={sendMessage} icon={<ArrowForwardIcon />} variant="ghost" />} />
          </InputGroup>
        </FormControl>
      </Box>
    </>
  )
}

export default SingleChat