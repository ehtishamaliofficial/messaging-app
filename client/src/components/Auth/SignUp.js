import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack,useToast} from "@chakra-ui/react";
import {useState} from "react";
import {useRegisterMutation } from '../../services/user/userServices'
import {useDispatch} from 'react-redux'
import {setUser} from '../../states/user/userState'
import {useNavigate} from 'react-router-dom'
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function SignUp(){
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const [register] = useRegisterMutation();
    const toast = useToast();
    const [name ,setName]=useState();
    const [email ,setEmail]=useState();
    const [password ,setPassword]=useState();
    const [c_password ,setC_Password]=useState();
    const [show, setShow]=useState(false);
    const [loading,setLoading]=useState(false);
    const [pic,setPic]=useState();
    const handleClick = () => setShow(!show);
   const postPic = (pic) => {
       setLoading(true);
       if(pic===undefined){
           toast({
                title: "Please select a pic",
                status: "warning",
                duration: 3000,
                isClosable: true,
               position:"top"
           })
              setLoading(false);
           return;
       }


       if(pic.type==="image/jpeg" || pic.type==="image/png"){
              const data = new FormData();
              data.append("file",pic);
              data.append("upload_preset","message-app");
              data.append("cloud_name","dhqvj0ald");
              fetch("https://api.cloudinary.com/v1_1/dhqvj0ald/image/upload",{
                method:"post",
                body:data
              })
                .then(res=>res.json())
                .then(data=>{
                     setPic(data.url)
                     setLoading(false);
                })
                .catch(err=>{
                     console.log(err);
                     setLoading(false);
                })
       }
   }

   const submitHandler = () => {
       if(name||email||password||c_password){
           register({name,email,password,c_password,pic}).then((res)=>{
               if(res.data){
                   const {success,user,tokens}=res.data;
                   if (success){
                       toast({
                            title: "Registered Successfully",
                            status: "success",
                            duration: 3000,
                            isClosable: true,
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
                    navigate("/chat",{replace:true});
                   }

               }
               if(res.error){
                   const {error}=res.error.data;
                   if (error){
                       toast({
                            title: error,
                            status: "error",
                            duration: 3000,
                            isClosable: true,
                           position:"top"
                       })
                   }
               }
           }).catch((err)=>{
               console.log(err);
           }
              )
       }
       else {
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
            <FormControl id={"first-name"} isRequired={true}>
                <FormLabel>Name</FormLabel>
                <Input
                    type={"name"}
                    placeholder="Enter Your Name"
                    onChange={(e)=>setName(e.target.value)}
                />
            </FormControl>
            <FormControl id={"email"} isRequired={true}>
                <FormLabel>Email</FormLabel>
                <Input
                    type={"email"}
                    placeholder="Enter Your Email"
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id={"password"} isRequired={true}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show?"text":"password"}
                        placeholder="Enter Your Password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <InputRightElement width={"4.5rem"}>
                        <Button style={{backgroundColor:"inherit"}} h={"1.75rem"} size={"sm "} onClick={handleClick}>{show?<ViewOffIcon/>:<ViewIcon/>}</Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id={"c_password"} isRequired={true}>
                <FormLabel>Confirm Password</FormLabel>
                    <Input
                        type={show?"text":"password"}
                        placeholder="Enter Your Password"
                        onChange={(e)=>setC_Password(e.target.value)}
                    />
            </FormControl><FormControl id={"c_password"} isRequired={true}>
                <FormLabel>Upload Picture</FormLabel>
                    <Input
                        type="file"
                        p={1.5}
                        placeholder="Upload file"
                        accept={"image/jpeg,image/png"}
                        onChange={(e)=>postPic(e.target.files[0])}
                    />
            </FormControl>
            <Button onClick={submitHandler} isLoading={loading} colorScheme={"blue"} width={"100%"} style={{marginTop:"15px"}}>Sign Up</Button>
        </VStack>
    )

}

export default SignUp;
