import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from 'react';
import UserContext from '../../users/usercontext';

export default function Registration() {
  const navigate = useNavigate();
  const showPassword = false
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [zip, setZip] = useState('');
  const [zipError, setZipError] = useState('');
  const [dob, setDOB] = useState('');
  const [dobError, setdobError] = useState('');
  const validateEmail = (mail) => {
        const reg = /^[a-zA-Z0-9_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (mail && !reg.test(mail)) {
            setEmailError("Email should be in format: abc@example.com");
            return false;
        }
        setEmailError("");
        return true;
    }
    const validatePhone = (phone) => {
        var reg = /^\d{3}-\d{3}-\d{4}$/
        if (phone && !reg.test(phone)) {
            setPhoneError("Phone number should be in format: 123-456-7890");
            return false;
        } 
        setPhoneError("");
        return true;
    }
    const validateZip = (zip) => {
        var reg = /^\d{5}$/;
        if (zip && !reg.test(zip)) {
            setZipError("Zip code should be in format: 11111");
            return false;
        } 
        setZipError("");
        return true;
    }
    const register = (async () => {
        if (!validateEmail(email)) return;
        if (!validatePhone(phone)) return;
        if (!validateZip(zip)) return;
        if (password !== passwordConf) {
          console.log("password: " + password);
          console.log("password conf: " + passwordConf);
          setPasswordError("Passwords don't match")
          return
        }
        if (username) {
            setUsername(username);
        }
        if (email) {
            setEmail(email);
        }
        if(zip) {
            setZip(zip);
        }
        if(password) {
            setPassword(password);
        }
        if (phone) {
            setPhone(phone);
        }
        if (dob) {
          setDOB(dob);
        }
    
        const user = {
            username: username,
            email: email,
            dob: Date.parse(dob),
            phone: phone,
            zip: zip,
            password: password,
        };
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordConf('');
        setPhone('');
        setZip('');
        setDOB('');
        console.log(JSON.stringify(user));
        const response = await fetch('http://localhost:3001/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
            mode: 'cors',
            credentials: 'include',
          body: JSON.stringify(user)
        });
        console.log(JSON.stringify({
          username: username,
          password: password
        }));
        // const loginResponse = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     username: username,
        //     password: password
        //   }),
        //   credentials: 'include',
        // }); 
        // navigate('/main');
    });
  return (
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Heading fontSize={'4xl'} textAlign={'center'} color="blue.400">
          Register
        </Heading>
        <Box
                    height='700px'
                    width='500px'
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
        <Stack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input value={username} type="text" onChange={(e) => setUsername(e.target.value)}/>
          </FormControl>
          <FormControl id="zip">
            <FormLabel>Zipcode</FormLabel>
            <Input value={zip} type="text" onChange={(e) => setZip(e.target.value)}/>
            <Text color="red.500">{zipError}</Text>
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
            <Text color="red.500">{emailError}</Text>
          </FormControl>
          <FormControl id="phone">
            <FormLabel>Phone Number</FormLabel>
            <Input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            <Text color="red.500">{phoneError}</Text>
          </FormControl>
          <FormControl id="dob">
            <FormLabel>Date of Birth:</FormLabel>
            <Input type="date" value={dob} onChange={(e) => setDOB(e.target.value)}/>
            <Text color="red.500">{dobError}</Text>
          </FormControl>
          <HStack>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
              <Text color="red.500">{passwordError}</Text>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Confirm Password</FormLabel>
              <Input value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} type={showPassword ? 'text' : 'password'} />
              <Text color="red.500">{passwordError}</Text>
          </FormControl>
          </HStack>
          <Stack spacing={10} pt={2}>
            <Button
            data-testid="register"
              onClick={register}
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Register
            </Button>
          </Stack>
        </Stack>
        </Box>
      </Stack>
  )
}