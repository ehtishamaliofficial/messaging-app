import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

function SearchResults({user,handleFunction}) {
  return (
    <Box
    onClick={handleFunction}
    display={"flex"}
    alignItems="center"
    px={3}
    py={2}
    backgroundColor="#E8E8E8"
    cursor="pointer"
    _hover={{
        backgroundColor:"#38B2AC",
        color:"white"
    }}
    borderRadius="lg"
    mb={3}
    >
        <Avatar
        mr={2}
        size="sm"
        cursor={"pointer"}
        name={user.name}
        src={user.pic}
        />
     <Box>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
     </Box>
    </Box>
  )
}

export default SearchResults