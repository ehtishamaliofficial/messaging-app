import { CloseIcon } from "@chakra-ui/icons"
import { Avatar, Tag, TagLabel } from "@chakra-ui/react"


function UserBadgeItem({user,handelFunction}) {
  return (
    <>
    <Tag mb={2} size='lg' colorScheme='red' borderRadius='full'>
    <Avatar
      src={user.pic}
      size='xs'
      name={user.name}
      ml={-1}
      mr={2}
    />
    <TagLabel>{user.name}</TagLabel>
    <CloseIcon cursor={"pointer"} ml={3}  onClick={handelFunction}/>
  </Tag>
  </>
  )
}

export default UserBadgeItem