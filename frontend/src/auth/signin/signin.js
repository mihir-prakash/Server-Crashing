import React, { useContext, useState } from 'react';
import UserContext from '../../users/usercontext';
import { useNavigate } from 'react-router-dom';

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Spacer,
    useColorModeValue,
} from '@chakra-ui/react'
import { act } from 'react-dom/test-utils';

function SignInForm() {
    const navigate = useNavigate();
    const { setUser, allUsers } = useContext(UserContext);
    const [inputUsername, setInputUsername] = useState("");
    const [inputStreet, setInputStreet] = useState("");
    const handleLogin = async () => {
        await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: inputUsername,
            password: inputStreet
          }),
          credentials: 'include',
        }).then(response => {
            if (!response.ok) {
                alert("login error");
            }
            navigate('/main')
        
        }).catch((error) => {
            alert("login error");
        }); 
        
    };
    return (
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Heading fontSize={'4xl'} textAlign={'center'} color="blue.400">Sign In</Heading>
                <Box
                    height='400px'
                    width='500px'
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <form id="signin" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                        <FormControl id="username">
                            <FormLabel>Username</FormLabel>
                            <Input type="text" data-testid="Username"
                            value={inputUsername} 
                            onChange={e => setInputUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" data-testid="Password"
                            value={inputStreet} 
                            onChange={e => setInputStreet(e.target.value)} 
                            />
                        </FormControl>
                        <Spacer height="20px"></Spacer>
                        <Button
                            type="submit"
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}>
                            Sign in
                        </Button>
                        </form>
                    </Stack>
                </Box>
            </Stack>
    )
}

export default SignInForm;