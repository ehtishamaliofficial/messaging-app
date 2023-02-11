import {configureStore} from '@reduxjs/toolkit';
import userReducer from './states/user/userState'
import userApi from './services/user/userServices'
import tokenApi from './services/token/tokenService'
import chatState from './states/chat/chatState';
import chatApi from './services/chat/chatServices';
import messageApi from './services/message/messageServices'

const store = configureStore({
    reducer: {
        user:userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [tokenApi.reducerPath]:tokenApi.reducer,
        chat:chatState.reducer,
        [chatApi.reducerPath]:chatApi.reducer,
        [messageApi.reducerPath]:messageApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        userApi.middleware,
        tokenApi.middleware,
        chatApi.middleware,
        messageApi.middleware
        ),
});

export default store;
