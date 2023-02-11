import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const token =`Bearer ${localStorage.getItem("token")}`;


const tokenApi=createApi({
    reducerPath:"tokenApi",
    baseQuery:fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/token' }),
    endpoints:(builder)=>({
        token:builder.query({
            query:()=>({
                url:"/",
                method:"GET",
                headers:{
                    "authorization":token
                }
            })
        })
    })
});


export default tokenApi;
export const {useTokenQuery}=tokenApi;