import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack,useToast} from "@chakra-ui/react";
import {useState} from "react";
import {useLoginMutation} from '../../services/user/userServices'
import {setUser} from '../../states/user/userState'
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function Login(){
    const [login]=useLoginMutation();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const toast=useToast();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [show,setShow]=useState(false);
    const handleClick = () => setShow(!show);

    const handleSubmit=()=>{
        if(email && password){
           login({email,password}).then(res=>{
              if(res.data){
                const {success,user,tokens}=res.data;
                if(success){
                    toast({
                        title:"Login SuccessFully!",
                        status:"success",
                        isClosable:true,
                        duration:3000,
                        position:"top"
                    })
                    dispatch(setUser({
                        login:true,
                        id:user._id,
                        name:user.name,
                        email:user.email,
                        pic:user.pic,
                        tokens

                    }))
                    localStorage.setItem("token",tokens)
                    localStorage.setItem("userdata",JSON.stringify(user));
                    navigate("/chat",{replace:true})
                }
              }
              if(res.error){
                const {error}=res.error.data;
                toast({
                    title:error,
                    status:"error",
                    isClosable:true,
                    duration:3000,
                    position:"top"
                })
              }
           }).catch(error=>{
             toast({
                 title:error,
                 status:"error",
                 isClosable:true,
                 duration:3000,
                 position:"top"
             })
           })
        }
        else{
            toast({
                    title: "Please enter all fields",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                   position:"top"
               })
        }

    }

    return (
        <VStack fontFamily={"Work sans"} spacing={"5px"}>
            <FormControl isRequired={true}>
                <FormLabel>Email</FormLabel>
                <Input
                   placeholder="Enter Your Email"
                   onChange={(e)=>setEmail(e.target.value)}
                />
            </FormControl><FormControl isRequired={true}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show?"text":"password"}
                        placeholder="Enter Your Email"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <InputRightElement width={"4.5rem"}>
                        <Button style={{backgroundColor:"inherit"}} h={"1.75rem"} size={"sm "} onClick={handleClick}>{show?<ViewOffIcon/>:<ViewIcon/>}</Button>
                    </InputRightElement>

                </InputGroup>
            </FormControl>
            <Button onClick={handleSubmit} colorScheme={"blue"} width={"100%"} style={{marginTop:"15px"}}>Login</Button>
            <Button colorScheme={"red"} width={"100%"} style={{marginTop:"15px"}}>Guest Login</Button>
        </VStack>
    )
}

export default Login;
