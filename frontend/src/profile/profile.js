import { Stack, Flex, Center, SimpleGrid, useColorModeValue, Box, Heading, Button } from "@chakra-ui/react";
import Info from "./info";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from 'react';
import UserContext from "../users/usercontext";
function ProfileHeader() {
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
                        Your Profile
                    </Heading>
                    <Button
                        onClick= {() => {navigate('/main')}}
                        size="lg"
                        bg="white"
                        color="blue.400"
                        >Main Page
                    </Button>
                </Stack>

            </Center>
        </Box>
    )
}
function ProfilePage() {
    return (
        <Stack>
            <ProfileHeader />
            <Flex
                height='1000px'
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
               
                    <Info></Info>
            </Flex>
        </Stack>

    )
}

export default ProfilePage;