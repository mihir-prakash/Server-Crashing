import {Box, Stack, Avatar, Text, useColorModeValue, HStack, FormControl, Input, Button, Flex} from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../users/usercontext';

function AddUser(props) {
    console.log("entered add user")
    const [usernameToAdd, setUsernameToAdd] = useState('');
    const handleAddUser = async () => {


        try {
            const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/following/'+usernameToAdd, {
              method: 'PUT',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              }
            });
    
            if (!response.ok) {
                alert('User not found!');
                throw new Error("user not found");
            }
            const data = await response.json();
            props.setFriends(data.following);
            
                  try {
                    const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/articles', {
                      method: 'GET',
                      credentials: 'include'
                    });
            
                    if (!response.ok) {
                      throw new Error('Failed to fetch articles');
                    }
            
                    const data = await response.json();
                    props.setFilteredPosts(data.articles);
                  } catch (error) {
                    console.error('Error fetching articles:', error.message);
                  }
               
            
          } catch (error) {
            console.error('Error updating headline:', error.message);
          }
    };
    return (
            <HStack>
                <FormControl>
                <Input 
                type="text"
                value={usernameToAdd} 
                onChange={(e) => setUsernameToAdd(e.target.value)}
                placeholder="Enter username to follow">
                </Input>
            </FormControl>
            <Button backgroundColor="blue.400" textColor="white" onClick={handleAddUser}>Add</Button>
            </HStack>
    );
}


function Friend(props) {
    const handleUnfollow = async (id) => {
        try {
            const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/following/'+id, {
              method: 'DELETE',
              credentials: 'include'
            });
            if (!response.ok) {
              throw new Error('Failed to fetch headline');
            }
            const data = await response.json();
            console.log(data);
            props.setFriends(data.following);
          } catch (error) {
            console.error('Error fetching following:', error.message);
          }
    };
    return (
        <Box
                    height='300px'
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
             <Stack>
             <Text color="blue.400">User: {props.username} </Text>
            <Avatar size="2xl" name={props.username} src={props.avatar}/>
            <Text color="blue.400">Status: {props.status}</Text>
            <Button backgroundColor="blue.400" textColor="white" onClick={() => handleUnfollow(props.username)}>Unfollow</Button>
            </Stack>
        </Box>
       
    )
}

function ThisUser () {
    const [headline, setHeadline] = useState('');
    const [username, setUsername] = useState('');
    const [avatarURL, setAvatarURL] = useState('');
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
          const fetchAvatarURL = async () => {
            try {
              const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/avatar', {
                method: 'GET',
                credentials: 'include'
              });
      
              if (!response.ok) {
                throw new Error('Failed to fetch headline');
              }
              const data = await response.json();
              console.log(data);
              setAvatarURL(data.avatar);
              
            } catch (error) {
              console.error('Error fetching avatar URL:', error.message);
            }
          };
          fetchHeadline();
          fetchAvatarURL();
    }, []);
    return (
    <Box
                    height='300px'
                    width='20vw'
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    align={'start'}
                    >
             <Stack>
             <Text fontSize={"2xl"} fontWeight={'bold'} color="blue.400">{username}</Text>
            <Avatar size="2xl" name={username} src={avatarURL}/>
            <Text color="blue.400">Status: {headline}</Text>
            
            </Stack>

        </Box>
    )
}

function Friends(props) {
    // const { user, allUsers } = useContext(UserContext);
    // if (!user || !user.follows || !allUsers) return null;
    // const friends = allUsers.filter(u => user.follows.includes(u.id));
    const [friends, setFriends] = useState([]);
    const [status, setStatus] = useState({});
    const [avatars, setAvatars] = useState({});
    useEffect(() => {
        const fetchFollowing = async () => {
            try {
              const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/following', {
                method: 'GET',
                credentials: 'include'
              });
      
              if (!response.ok) {
                throw new Error('Failed to fetch headline');
              }
              const data = await response.json();
              setFriends(data.following);
              await avatarHeadline(data.following);
              
            } catch (error) {
              console.error('Error fetching following:', error.message);
            }
          };
          fetchFollowing();
    }, []);
    const avatarHeadline = async (following) => { await following.forEach(async (friend) => {
      try {
          const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/headline/'+friend, {
            method: 'GET',
            credentials: 'include'
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch headline');
          }
          const data = await response.json();
          let newStatus = status;
          newStatus[friend] = data.headline;
          console.log(data.headline);
          setStatus(newStatus);
        } catch (error) {
          console.error('Error fetching following:', error.message);
        }
        try {
          const response2 = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/avatar/'+friend, {
            method: 'GET',
            credentials: 'include'
          });
  
          if (!response2.ok) {
            throw new Error('Failed to fetch headline');
          }
          const data = await response2.json();
          console.log(data);
          let newAvatars = avatars;
          newAvatars[friend] = data.avatar;
          console.log(data.avatar);
          setAvatars(newAvatars);
        } catch (error) {
          console.error('Error fetching following:', error.message);
        }
        //setFriends(friends);

  }); }
    
    return (
        <Flex alignItems="flex-start">
        <Stack height='100vh' marginStart='0px' display={'flex'} alignItems={'start'} >
            <ThisUser/>
            <AddUser setFriends={setFriends} setFilteredPosts={props.setFilteredPosts}></AddUser>
            {friends.map(friend => (
                <Friend 
                    setFriends={setFriends}
                    username={friend} 
                    status={status[friend]}
                    avatar={avatars[friend]}
                />
            ))}
            
        </Stack>
        </Flex>
    )
}
export default Friends;