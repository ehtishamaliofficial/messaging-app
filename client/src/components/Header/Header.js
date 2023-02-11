import { Box, Button, Menu, MenuButton, MenuList, Text, Tooltip ,Avatar, MenuItem, MenuDivider, Drawer,useDisclosure, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import React, { useState } from 'react'
import ProfileModel from './ProfileModel';
import { useSelector,useDispatch } from 'react-redux';
import {removeUser} from '../../states/user/userState'
import { useNavigate } from 'react-router-dom';
import { useLazySearchUsersQuery } from '../../services/user/userServices';
import {useAccessChatMutation} from '../../services/chat/chatServices'
import ChatLoading from '../chat/ChatLoading';

function Header() {
 const dispatch=useDispatch();
 const navigate=useNavigate();
 const [search,setSearch]=useState("");
 const [searchResult,setSearchReult]=useState([]);
 const [loading,setLoading]=useState(false);
 const user=useSelector(state=>state.user)
 const {isOpen,onClose,onOpen}=useDisclosure()
const [searchApi,]=useLazySearchUsersQuery()
const [accessChatApi]=useAccessChatMutation();


   const handleLogout=()=>{
    localStorage.removeItem("userdata");
    localStorage.removeItem("token");
    dispatch(removeUser())
    navigate("/",{replace:true})
   }

   const handleSearch=async()=>{
    setLoading(true)
       searchApi(search).then(res=>{
         const {isSuccess}=res;
          if(isSuccess){
            setLoading(false)
            const {data}=res;
            setSearchReult(data)
            // console.log(searchResult);
          }
       })
    }

    const accessChat=async(id)=>{
        accessChatApi(id).then(res=>{
            console.log(res);
        })
    }

  return (
    <>
       <Box fontFamily={"Work sans"}  backgroundColor={"white"} p="5px 10px 5px 10px" borderWidth={"5px"} display={"flex"} justifyContent="space-between" alignItems={"center"} >
           <Tooltip display={"flex"} alignItems="center" label="Search User to Chat" hasArrow placement='bottom'>
               <Button variant={"ghost"} onClick={onOpen} _hover={{color:"black"}}>
                 <SearchIcon/>
                 <Text display={{base:"none",md:"flex"}}  px={"5px"}>Search User</Text>
               </Button>
           </Tooltip>
           <Text display={"flex"} alignItems="center" fontSize={"4xl"} fontFamily="work sans">Messager</Text>
           <div>
                <Menu>
                    <MenuButton>
                        <BellIcon fontSize={"2xl"} m={1}/>
                    </MenuButton>
                </Menu>
                <Menu>
                      <MenuButton as={Button} rightIcon={<ChevronDownIcon color={"black"}/>}>
                         <Avatar border={"black"} size={"sm"} name={user.name} src={user.pic}  />
                      </MenuButton>
                      <MenuList color={"black"}>
                        <ProfileModel user={user}>
                        <MenuItem>My Profile</MenuItem>
                        </ProfileModel>
                        <MenuDivider/>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </MenuList>
                </Menu>
           </div>
       </Box>


       <Drawer  placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent fontFamily={"Work sans"}>
            <DrawerHeader borderBottomWidth={"1px"}>
              <ArrowBackIcon mr={2} onClick={onClose}/>
              Search Users
              </DrawerHeader>
            <DrawerBody>
            <Box display={"flex"} p={2}>
                  <Input
                   placeholder='Search By User Name'
                   mr={2}
                   value={search}
                   onChange={e=>setSearch(e.target.value)}
                  />
                  <Button onClick={handleSearch}><ArrowForwardIcon/></Button>
            </Box>
            {loading?<ChatLoading/>:
            searchResult.map(user=>{
                return(<Box
                        key={user._id}
                        onClick={()=>{accessChat(user._id)}}
                        display={"flex"}
                        alignItems="center"
                        px={3}
                        mb={2}
                        py={2}
                        backgroundColor="#E8E8E8"
                        cursor="pointer"
                        _hover={{
                            backgroundColor:"#38B2AC",
                            color:"white"
                        }}
                        borderRadius="lg"
                        >
                            <Avatar
                            mr={2}
                            size="sm"
                            cursor={"pointer"}
                            name={user.name}
                            src={user.pic}
                            />
                         <Box>
                            <Text>{user.name}</Text>
                            <Text>{user.email}</Text>
                         </Box>
                        </Box>)
                })}
        </DrawerBody>
        </DrawerContent>
       </Drawer>
    </>
  )
}

export default Header