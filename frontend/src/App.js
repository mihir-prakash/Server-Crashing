import React from 'react';
import {HashRouter as Router,
  Routes,
  Route,
  Link} from 'react-router-dom';
import MainPage from './main/main'
import AuthPage from './auth/auth';
import ProfilePage from './profile/profile';
import { Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import UserProvider from './users/user';


function App() {
  return (
    <UserProvider>
    <ChakraProvider>
    <Router>
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<AuthPage />}/>
            <Route path="/main" element={<MainPage />}/>
            <Route path="/profile" element={<ProfilePage />}/>
        </Routes>
    </Router>
    </ChakraProvider>
    </UserProvider>
);

}

export default App;
