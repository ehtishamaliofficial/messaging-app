export const getSender=(loggedUser, users)=>{
    return users[0]._id === loggedUser._id ? users[1] : users[0];
   }

export const isSameSender=(message,user)=>{
    return message.sender._id===user._id?{base:"60",md:"80"}:"0"
}
