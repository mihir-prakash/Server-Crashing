import {
    Box,
    HStack,
    Stack,
    Heading,
    Text,
    Avatar,
    useColorModeValue,
    Spacer,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Button,
    Flex
} from '@chakra-ui/react'

import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../users/usercontext';



function ProfilePic(props) {
    console.log(props.username);
    return (
        <Box
        height='200px'
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <HStack spacing={4}>
            <Avatar size="2xl" name={props.username} src={props.avatarURL} />
            <Stack>
            <Text fontSize="2xl" fontWeight="bold" color='blue.400'>{props.username}</Text>
            <Text fontSize="medium" fontWeight="normal" color='blue.400'>{props.headline}</Text>
            </Stack>
            
        </HStack>
        </Box>
    )

}
function PersonalInfo(props) {
    return (
        <Box
            height='400px'
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={8}>
                <Heading fontSize="3xl" color="blue.400" fontStyle='bold'>
                    Personal Information:
                </Heading>
                <Spacer height='10px'></Spacer>
                <HStack>
                    <Heading fontSize="xl" color="blue.400" >
                        Email:
                    </Heading>
                    <Text data-testid="email" fontSize="lg" color="blue.400" id="email">
                        {props.email}
                    </Text>
                </HStack>
                <HStack>
                    <Heading fontSize="xl" color="blue.400" >
                        Phone Number:
                    </Heading>
                    <Text data-testid="number" fontSize="lg" color="blue.400" id="number">
                        {props.number}
                    </Text>
                </HStack>
                <HStack>
                    <Heading fontSize="xl" color="blue.400" id="zip">
                        Zip Code:
                    </Heading>
                    <Text data-testid="zip" fontSize="lg" color="blue.400">
                        {props.zip}
                    </Text>
                </HStack>
                <HStack>
                    <Heading fontSize="xl" color="blue.400" >
                        DOB:
                    </Heading>
                    <Text data-testid="username" fontSize="lg" color="blue.400" id="user">
                        {new Date(props.dob).toLocaleDateString()}
                    </Text>
                </HStack>
            </Stack>
        </Box>
    )

}

function UpdateInfo(props) {
    const [tempHeadline, setTempHeadline] = useState('');
    const [tempEmail, setTempEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [tempPhone, setTempPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [tempZip, setTempZip] = useState('');
    const [zipError, setZipError] = useState('');
    const [tempImage, setTempImage] = useState(new File([], 'temp.txt'));
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
    const handleUpdate = async () => {
        if (!validateEmail(tempEmail)) return;
        if (!validatePhone(tempPhone)) return;
        if (!validateZip(tempZip)) return;
        if (tempImage.name !== "temp.txt") {
          console.log("hello");
          const fd = new FormData();
          console.log(tempImage);
          fd.append('image', tempImage);
          for (const value of fd.entries()) {
            console.log(value);
          }
          try{
          const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com//avatar',
          {
            method: 'PUT',
            credentials: 'include',
            body: fd,
          });
          
                if (!response.ok) {
                  throw new Error('Failed to update avatar');
                }
                const data = await response.json();
                console.log(data);
                props.setAvatarURL(data.avatar);
              } catch (error) {
                console.error('Error updating avatar:', error.message);
              }
        }
        if (tempHeadline) {
              try {
                const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/headline', {
                  method: 'PUT',
                  credentials: 'include',
                  body: JSON.stringify({
                    headline: tempHeadline
                  }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
        
                if (!response.ok) {
                  throw new Error('Failed to update headline');
                }
                const data = await response.json();
                props.setHeadline(data.headline);
              } catch (error) {
                console.error('Error updating headline:', error.message);
              }
            
        }
        if (tempEmail) {
            
                try {
                  const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/email', {
                    method: 'PUT',
                    credentials: 'include',
                    body: JSON.stringify({
                      email: tempEmail
                    }),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
          
                  if (!response.ok) {
                    throw new Error('Failed to update email');
                  }
                  const data = await response.json();
                  props.setEmail(data.email);
                } catch (error) {
                  console.error('Error updating email:', error.message);
                }
              
        }
        if(tempZip) {
           
                try {
                  const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/zipcode', {
                    method: 'PUT',
                    credentials: 'include',
                    body: JSON.stringify({
                      zipcode: tempZip
                    }),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
          
                  if (!response.ok) {
                    throw new Error('Failed to update zipcode');
                  }
                  const data = await response.json();
                  props.setZip(data.zipcode);
                } catch (error) {
                  console.error('Error updating zipcode:', error.message);
                }
              
        }
        if (tempPhone) {
            
                try {
                  const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/' +
                      'phone', {
                    method: 'PUT',
                    credentials: 'include',
                    body: JSON.stringify({
                      phone: tempPhone
                    }),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
          
                  if (!response.ok) {
                    throw new Error('Failed to update phone');
                  }
                  const data = await response.json();
                  props.setPhone(data.phone);
                } catch (error) {
                  console.error('Error updating phone:', error.message);
                }
              
        }
        setTempHeadline('');
        setTempEmail('');
        setTempPhone('');
        setTempZip('');
        setTempImage(new File([], 'temp.txt'));
    }
    return (
            <Box
                    height='700px'
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Heading color='blue.400' fontSize={'3xl'} textAlign={'center'}>
                    Update Personal Information
                </Heading>
                        
                    <Stack spacing={4}>
                    <form>
                            <FormLabel htmlFor="photo">Update Profile Photo</FormLabel>
                            <input type="file" name="avatar" accept="image/*" onChange={async (e) => {
                              await setTempImage(e.target.files[0]);
                              console.log(tempImage);
                            }}/>
                    </form>
                    <form id="updateinfo">
                        <FormControl id="newusername">
                            <FormLabel>Headline</FormLabel>
                            <Input value={tempHeadline} type="text" onChange={(e) => setTempHeadline(e.target.value)}/>
                        </FormControl>
                        <FormControl id="newzip">
                            <FormLabel>Zipcode</FormLabel>
                            <Input value={tempZip} type="text" onChange={(e) => setTempZip(e.target.value)}/>
                            <Text color="red.500">{zipError}</Text>
                        </FormControl>
                        <FormControl id="newemail">
                            <FormLabel>Email address</FormLabel>
                            <Input value={tempEmail} type="email" onChange={(e) => setTempEmail(e.target.value)}/>
                            <Text color="red.500">{emailError}</Text>
                        </FormControl>
                        <FormControl id="newphone">
                            <FormLabel>Phone Number</FormLabel>
                            <Input type="phone" value={tempPhone} onChange={(e) => setTempPhone(e.target.value)}/>
                            <Text color="red.500">{phoneError}</Text>
                        </FormControl>
                        </form>
                        <Stack spacing={10} pt={2}>
                            <Button
                                onClick={handleUpdate}
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Update
                            </Button>
                        </Stack>
                    </Stack>
                    </Stack>
                </Box>
    )
}

export default function Info() {
    const [username, setUsername] = useState('');
    const [headline, setHeadline] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [zip, setZip] = useState('');
    const [zipError, setZipError] = useState('');
    const [dob, setDOB] = useState('');
    const [avatarURL, setAvatarURL] = useState("");
    useEffect(() => {
        const fetchHeadline = async () => {
            try {
              const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/headline', {
                method: 'GET',
                credentials: 'include'
              });
      
              if (!response.ok) {
                throw new Error('Failed to fetch headline');
              }
              const data = await response.json();
              console.log(data);
              setUsername(data.username);
              setHeadline(data.headline);
            } catch (error) {
              console.error('Error fetching headline:', error.message);
            }
          };
        const fetchEmail = async () => {
          try {
            const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/email', {
              method: 'GET',
              credentials: 'include'
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch email');
            }
    
            const data = await response.json();
            setEmail(data.email);
          } catch (error) {
            console.error('Error fetching email:', error.message);
          }
        };
        const fetchPhone= async () => {
            try {
              const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/phone', {
                method: 'GET',
                credentials: 'include'
              });
      
              if (!response.ok) {
                throw new Error('Failed to fetch email');
              }
      
              const data = await response.json();
              setPhone(data.phone);
            } catch (error) {
              console.error('Error fetching phone:', error.message);
            }
          };
          const fetchZipcode= async () => {
            try {
              const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/zipcode', {
                method: 'GET',
                credentials: 'include'
              });
      
              if (!response.ok) {
                throw new Error('Failed to fetch email');
              }
      
              const data = await response.json();
              setZip(data.zipcode);
            } catch (error) {
              console.error('Error fetching phone:', error.message);
            }
          };
          const fetchDOB= async () => {
            try {
              const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/dob', {
                method: 'GET',
                credentials: 'include'
              });
      
              if (!response.ok) {
                throw new Error('Failed to fetch email');
              }
      
              const data = await response.json();
              setDOB(data.dob);
            } catch (error) {
              console.error('Error fetching phone:', error.message);
            }
          };
          const fetchAvatarURL= async () => {
            try {
              const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/avatar', {
                method: 'GET',
                credentials: 'include'
              });
              
              if (!response.ok) {
                throw new Error('Failed to fetch avatar');
              }
      
              const data = await response.json();
              setAvatarURL(data.avatar);
              console.log(data);
            } catch (error) {
              console.error('Error fetching avatar url:', error.message);
            }
          };
          fetchHeadline();
        fetchPhone();
        fetchEmail();
        fetchZipcode();
        fetchDOB();
        fetchAvatarURL();
    }, []);
    return (
        <Flex verticalAlign={'top'} >
        <HStack verticalAlign={'top'} spacing={20}>
            <Stack flexGrow={2} spacing='100px'>
            <ProfilePic username={username} headline={headline} avatarURL={avatarURL}/>
            <PersonalInfo dob={dob} email={email} zip={zip} number={phone}/>
            </Stack>
            <UpdateInfo flexGrow={4} username={username} setHeadline={setHeadline} setAvatarURL={setAvatarURL} setEmail={setEmail} setZip={setZip} setPhone={setPhone}/>
        </HStack>
        </Flex>
        
    )
}