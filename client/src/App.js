import {Route,Routes} from 'react-router-dom';
import './App.css';
import HomePage from "./pages/HomePage";
import {useSelector} from 'react-redux'
import ChatPage from './pages/ChatPage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setUser,removeUser} from "./states/user/userState"
import {useTokenQuery} from "./services/token/tokenService"
import { useToast } from '@chakra-ui/react';


function App() {
  const toast=useToast();
  const {isSuccess,isLoading}=useTokenQuery();
  // console.log(isSuccess);
  // const location=useLocation();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {login}=useSelector(state=>state.user);
  
  useEffect(()=>{
    if(!localStorage.getItem("userdata")){
       navigate("/",{replace:true});
    }
    else{
      if(!isLoading){
      if(isSuccess){
        const userdata=JSON.parse(localStorage.getItem("userdata"));
        dispatch(setUser({
          login:true,
          id:userdata._id,
          name:userdata.name,
          email:userdata.email,
          pic:userdata.pic,
        }));
        navigate("/chat",{replace:true});
      }
      else{
        toast({
          title:"Your Token Expire Login Again",
          status:"info",
          isClosable:true,
          position:"top",
          duration:3000
        })
        navigate("/",{replace:true})
        dispatch(removeUser());
      }
      }

    }
  // eslint-disable-next-line
  },[isLoading])

  if(!login){
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='*' element={<div>Page Not Found!</div>} />
        </Routes>
    </div>
  )
  }
  if(login){
    return(
      <div className='App'>
            <Routes>
               <Route path={"/chat"} element={<ChatPage/>} />
               <Route path='*' element={<div>Page Not Found!</div>} />
            </Routes>
      </div>
    )
  }
}

export default App;
