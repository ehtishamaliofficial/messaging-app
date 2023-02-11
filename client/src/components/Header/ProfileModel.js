import { ViewIcon } from "@chakra-ui/icons";
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";


function ProfileModel({user,children}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return( <>

         {children?<span onClick={onOpen}>{children}</span>:(
            <IconButton
              d={{base:"flex"}}
              icon={<ViewIcon/>}
              onClick={onOpen}
            />
         )}
      <Modal
       isCentered
       size={"lg"}
       isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
           display={"flex"}
           justifyContent="center"
           fontSize={"40px"}
           fontFamily="Work sans"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display={"flex"}
          flexDir="column"
          justifyContent={"space-between"}
          alignItems={"center"}
          >
            <Image
             borderRadius={"full"}
             boxSize={"150px"}
             src={user.pic}
             alt={user.name}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> 
      </>
  )
}

export default ProfileModel;