import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const messageApi=createApi({
    reducerPath:"messageApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000/api/v1/message",
        prepareHeaders:(headers)=>{
            headers.set("authorization",`Bearer ${localStorage.getItem("token")}`);
        return headers;
    }
    }),
    tagTypes:['messages'],
    endpoints:(builder)=>({
        sendMessage:builder.mutation({
            query:(body)=>({
                url:"/",
                method:"POST",
                body
            }),
            invalidatesTags:['messages']
        }),
        getAllMessage:builder.query({
            query:(chatId)=>({
                url:`/${chatId}`,
                method:"GET"
            }),
            providesTags:['messages']
        })
    })
})


export default messageApi;
export const {useLazyGetAllMessageQuery,useSendMessageMutation}=messageApi;