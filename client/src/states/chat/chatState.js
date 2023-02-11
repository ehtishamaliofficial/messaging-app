import {createSlice} from '@reduxjs/toolkit'


const chatState=createSlice({
    name:"chat",
    initialState:{
        chats:[],
        selectedChat:null
    },
    reducers:{
        setChat:(state,{payload})=>{
            state.chats=payload.data;  //that working
        },
        setSelectedChat:(state,{payload})=>{
            state.selectedChat=payload.chat;
        }
    }
})


export default chatState;
export const {setChat,setSelectedChat}=chatState.actions;