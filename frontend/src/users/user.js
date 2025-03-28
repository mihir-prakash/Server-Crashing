import React, { useState, useEffect } from 'react';
import UserContext from './usercontext';

export default function UserProvider({ value, children }) {
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]); // Store all fetched users
    const [allPosts, setAllPosts] = useState([]);
    useEffect(() => {
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('loggedInUser');
        }
    }, [user]);
    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    useEffect(() => {
        // Fetch both users and posts data
        Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()),
            fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
        ])
        .then(([users, posts]) => {
            posts = posts.map(post => ({
                ...post, 
                u: users.find(u => u.id === post.userId)
              }));
              console.log("user posts: " + posts[0].u.username);
            
            const augmentedUsers = users.map(user => {
                // Find posts for this user
                //console.log("aug username: " + user.username)
                const userPosts = posts.filter(post => post.userId === user.id);
                
                let follows = [];
                if (user.id === 10) {
                    follows = [1, 2, 3];
                } else if (user.id === 9) {
                    follows = [10, 1, 2];
                } else if (user.id === 8) {
                    follows = [9, 10, 1];
                } else {
                    follows = [user.id + 1, user.id + 2, user.id + 3].filter(id => id <= 10);
                }

                // Return combined user data with follows and posts
                return {
                    ...user,
                    follows: follows,
                    posts: userPosts,
                    email: "placeholder@gmail.com",
                    phone: "123-456-7890",
                    zip: "11111"
                };
            });
            setAllUsers(augmentedUsers);
            setAllPosts(posts);
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, allUsers, setAllPosts, allPosts, ...value }}>
            {children}
        </UserContext.Provider>
    );
}
