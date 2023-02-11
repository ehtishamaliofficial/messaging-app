import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const chatApi=createApi({
    reducerPath:"chatApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000/api/v1/chat",
        prepareHeaders:(headers)=>{
                headers.set("authorization",`Bearer ${localStorage.getItem("token")}`);
            return headers;
        }
    }),
    tagTypes:['Chats'],
    endpoints:(builder)=>({
        accessChat:builder.mutation({
            query:(id)=>({
                url:"/",
                method:"POST",
                body:{
                    "userId":id
                }
            })
        }),
        fetchChats:builder.query({
            query:()=>({
                url:"/",
                method:"GET",
                
            }),
            providesTags: ['Chats']
        }),
        craeteGroup:builder.mutation({
            query:(body)=>({
                url:"/createGroup",
                method:"POST",
                body
            }),
            invalidatesTags: ['Chats']
        })
    })
})


export default chatApi;
export const {useAccessChatMutation,useLazyFetchChatsQuery,useFetchChatsQuery,useCraeteGroupMutation}=chatApi;