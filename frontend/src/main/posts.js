import {Form, Box, Stack, Text, useColorModeValue, Image, Button, HStack, Center, FormControl, FormLabel, Input, Heading, Flex} from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../users/usercontext';

function Post(props) {
    const [realPostText, setRealPostText] = useState(props.caption);
    const [newPostText, setNewPostText] = useState(realPostText);
    const [formVisible, setFormVisible] = useState(false);
  
    function openForm() {
      setFormVisible(true);
    }
  
    function closeForm() {
      setFormVisible(false);
    }
  
    function handleUpdate() {
      setRealPostText(newPostText);
      closeForm();
      // Add logic here to send the updated caption to the server if needed
    }
  
    return (
      <Box
        height='600px'
        width='16vw'
        rounded='lg'
        bg='gray.300'
        boxShadow='lg'
        p={8}
      >
        <Stack>
          <Text size="16px" fontWeight="bold">Author: {props.author}</Text>
          <Image src={props.src} />
          <Text>Caption: {realPostText}</Text>
          <FormControl id="edit form" display={formVisible ? 'block' : 'none'}>
            <FormLabel color="blue.400">Edit Post:</FormLabel>
            <Input
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
            <Button
              onClick={handleUpdate}
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Update
            </Button>
          </FormControl>
          <Button backgroundColor="blue.400" textColor="white" onClick={openForm}>
            Edit
          </Button>
          <Button backgroundColor="blue.400" textColor="white">
            Comment
          </Button>
        </Stack>
      </Box>
    );
  }

function Posts(props) {
    const [page, setPage] = useState(1);
    const perPage = 3;
    const { user, allUsers } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    // var filteredPosts
    //var displayedPosts;
    const [displayedPosts, setDisplayedPosts] = useState([]); // State to store fetched posts

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);
    
    // if (props.filteredPosts.length < perPage) {
    //     setDisplayedPosts(props.filteredPosts);
    // }
    // else {
    //     setDisplayedPosts(props.filteredPosts.slice((page - 1) * perPage, page * perPage));
    // }
    console.log(props.filteredPosts);
    return (
        <Flex
        
                align='start'
                alignItems='start'
                
        >
        <Stack>
        <Box
                    height='100px'
                    
                    rounded={'lg'}
                    bg='gray.300'
                    boxShadow={'lg'}
                    p={8}>
        <Heading color='blue.400' fontSize={'4xl'} textAlign={'center'}>
                    Posts
        </Heading>
        </Box>
        <AddPost setFilteredPosts={props.setFilteredPosts}/>
        <Box
                    height='150px'
                    
                    rounded={'lg'}
                    bg='gray.300'
                    boxShadow={'lg'}
                    p={8}>
        <FormControl>
            <FormLabel color="blue.400">
                Search for Posts:
            </FormLabel>
                <Input
                        placeholder="Search posts"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                />
        </FormControl>
        </Box>
        <Center>
        <HStack spacing={4}>
  {props.filteredPosts
    .filter(post => (
      (post.text && post.text.includes(searchTerm)) || (post.author && post.author.includes(searchTerm))
    ))
    .sort((a, b) => b.pid - a.pid)
    .slice((page - 1) * 4, page * 4)
    .map(post => (
      <Post
        key={post.pid} // Add a unique key
        src={post.image}
        caption={post.text}
        author={post.author}
      />
    ))}
  {props.filteredPosts.length === 0 && <p>No matching posts found.</p>}
</HStack>
        </Center>
        <Center>
        <HStack align={'center'}>
        <Button backgroundColor="blue.400" textColor="white" onClick={() => setPage( () => {
            if (page === 1) {
                return page
            } else {
              console.log(page-1);
                return page - 1
            }
        }
            )}>Previous</Button>
        <Button backgroundColor="blue.400" textColor="white" onClick={() => setPage( () => {
            if (page === Math.ceil(props.filteredPosts
              .filter(post => (
                (post.text && post.text.includes(searchTerm)) || (post.author && post.author.includes(searchTerm))
              )).length/4)) {
                return page
            } else {
              console.log(page+1);
                return page + 1
            }
        }
            )}>Next</Button>
        </HStack>
        </Center>

        </Stack>
        </Flex>
    )

}

function AddPost(props) {
    const [newPostText, setNewPostText] = useState('');
    const [tempImage, setTempImage] = useState(new File([], 'temp.txt'));
    //const setFilteredPosts = props.setFilteredPosts;
    //const { user, setUser, allUsers, setAllPosts } = useContext(UserContext);
    //console.log("prev user: " + JSON.stringify(user));
    const clearPost = () => {
        document.getElementById('newpost').reset();
    }

  
    const newPost = async () => {
        console.log(newPostText);
        const fd = new FormData();
          console.log(tempImage);
          fd.append('image', tempImage);
          fd.append('text', newPostText);
      try {
        const response = await fetch('https://peaceful-dusk-46842-f6cd8d1740b7.herokuapp.com/article', {
          method: 'POST',
          credentials: 'include',
          body: fd
        });

        if (!response.ok) {
          throw new Error('Failed to add article');
        }
        const data = await response.json();
        console.log(data.articles);
        props.setFilteredPosts(data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error.message);
      }
      clearPost();
    };


    return (
        <Box
            height='300px'
            width='78vw'
            rounded={'lg'}
            bg='gray.300'
            boxShadow={'lg'}
            p={8}>
            <form id='newpost' onSubmit={(e) => {
              e.preventDefault();
              newPost();
            }
              
              
              }>
                <Stack height={'200px'} spacing={5}>
                    <Heading color='blue.400' fontSize={'3xl'} textAlign={'center'}>
                        Add New Post
                    </Heading>
                    <HStack>
                      
                        <FormControl>
                            <FormLabel htmlFor="photo">Add Photo</FormLabel>
                            <Input type="file" id="photo" accept="image/*" isRequired onChange={(e) => setTempImage(e.target.files[0])}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>New Post</FormLabel>
                            <Input type="text" placeholder="Your Post Here" isRequired onChange={(e) => setNewPostText(e.target.value)} />
                        </FormControl>
                    </HStack>
                    <Center>
                        <HStack spacing={3}>
                            <Button backgroundColor="blue.400" textColor="white" onClick={clearPost}>Clear</Button>
                            <Button type="submit" backgroundColor="blue.400" textColor="white" >Post</Button>
                        </HStack>
                    </Center>
                </Stack>
            </form>
        </Box>
    )
}


export default Posts;