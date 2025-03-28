import {Box, Center, Stack, Heading, HStack, Button, Flex, useColorModeValue, SimpleGrid} from "@chakra-ui/react";
import Info from "../profile/info";
import Friends from "./friends";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "./posts";
import UserContext from "../users/usercontext";

function MainHeader() {
    const navigate = useNavigate();
    return (
        <Box
            w="100%"
            h="300px"
            bgGradient="linear(to-r, gray.300, blue.400, gray.300)"
        >
            <Center>
                <Stack>
                    <Heading size="3xl" pt="100px" color="white" pb="5">
                        Your Feed
                    </Heading>
                    <HStack>
                    <Button
                        onClick= {() => {navigate('/profile')}}
                        size="lg"
                        bg="white"
                        color="blue.400"
                        >Profile Page
                    </Button>
                    <Button
                        onClick= {() => {
                            localStorage.setItem('loggedInUser', "");
                            navigate('/login')
                        }}
                        size="lg"
                        bg="white"
                        color="blue.400"
                        >Logout
                    </Button>
                    </HStack>
                </Stack>

            </Center>
        </Box>
    )
}
function MainPage() {
    // const {setUser} = useContext(UserContext)
    // useEffect(() => {
    //     const storedUser = localStorage.getItem('loggedInUser');
    //     //console.log("Retrieved from localStorage:", storedUser);
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     }
    // }, []);
    const [filteredPosts, setFilteredPosts] = useState([]);
    return (
        <Stack>
            <MainHeader/>
            <Flex
                alignItems="flex-start"
                align={'start'}
                width='100%'
                bg={useColorModeValue('gray.50', 'gray.800')}>
            <HStack display={'flex'} alignItems={'start'}>
            <Friends setFilteredPosts={setFilteredPosts} width='40%'></Friends>
            <Posts filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts} data-testid="posts" width='50%'/>
            </HStack>
            </Flex>
        </Stack>
        

    )
}

export default MainPage;