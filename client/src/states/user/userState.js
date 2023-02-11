import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    login:false,
    id:"",
    name:"",
    email:"",
    pic:"",
    tokens:"",
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.login=action.payload.login
            state.id=action.payload.id;
            state.name=action.payload.name;
            state.email=action.payload.email;
            state.pic=action.payload.pic;
            state.tokens=action.payload.tokens;
        },
        removeUser:(state)=>{
            state.name="";
            state.email="";
            state.pic="";
            state.tokens="";
        }
    }
})

export const {setUser,removeUser} = userSlice.actions;
export default userSlice.reducer;
