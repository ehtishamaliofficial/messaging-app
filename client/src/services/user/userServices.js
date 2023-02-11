//import RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/user' }),
    endpoints: (builder) => ({
        //register user
        register: builder.mutation({
            query: (body) => ({
                url:"/register",
                method:"POST",
                body
            })
        }),
        login:builder.mutation({
            query:(body)=>({
                url:"/login",
                method: "POST",
                body
            })
        }),
        searchUsers:builder.query({
            query:(query)=>({
                url:`?search=${query}`,
                method:"GET",
                headers:{
                        "authorization":`Bearer ${localStorage.getItem("token")}`
                }
            })
        })
    })
});


export const { useRegisterMutation,useLoginMutation,useLazySearchUsersQuery } = userApi;
export default userApi;
