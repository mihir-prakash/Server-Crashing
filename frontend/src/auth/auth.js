import SignInForm from './signin/signin'
import Registration from './registration/registration'
import { SimpleGrid, Box, Stack, Heading, Center, Flex, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react';
import UserContext from '../users/usercontext';

function WelcomeBanner() {
    return(
        <Box
        w="100%"
        h="300px"
        bgGradient="linear(to-r, gray.300, blue.400, gray.300)"
      >
        <Center>
            <Heading size="3xl" pt="100px" color="white" pb="5">
            OwlConnect
            </Heading>
        </Center>
        <Center>
        <Heading fontSize="xl" color="white">
          A space to meet new people and interact with those you know already.
        </Heading>
        </Center>
      </Box>
    )
}
function AuthPage () {
    const {setUser} = useContext(UserContext)
    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    return (
        <Stack>
            <WelcomeBanner></WelcomeBanner>
            <Flex
            height='800px'
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <SimpleGrid columns={2}>
                <SignInForm/>
                <Registration/>
            </SimpleGrid>
            </Flex>
        </Stack>
    )

}

export default AuthPage
