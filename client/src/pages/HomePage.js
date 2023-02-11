import {Container,Box,Text,Tabs,Tab,TabList,TabPanel,TabPanels} from '@chakra-ui/react'
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";



function HomePage() {
  return (
    <Container fontFamily={"Work sans"} maxW={"xl"} centerContent>
       <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"blue"}
        w="100%"
        borderRadius="lg"
        m={"40px 0 15px 0"}
        borderWidth={"1px"}
       >
            <Text color={"white"} fontSize={{base:"2xl",md:"4xl"}} fontFamily={"Work sans"} >Messager Chat App</Text>
       </Box>
        <Box
         w={"100%"}
         p={4}
         bg={"white"}
         borderRadius="lg"
         borderWidth={"1px"}
        >
            <Tabs variant='soft-rounded' colorScheme='blue'>
                <TabList>
                    <Tab width={"50%"}>Login</Tab>
                    <Tab width={"50%"}>Sign Up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login/>
                    </TabPanel>
                    <TabPanel>
                        <SignUp/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    </Container>
  );
}

export default HomePage;
