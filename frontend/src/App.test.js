
import React, { useContext } from 'react';
import SignInForm from './auth/signin/signin'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import { render, fireEvent, waitFor, screen, getByPlaceholderText} from '@testing-library/react';
import UserProvider from './users/user';
import MainPage from './main/main';
import App from './App';
import Friends from './main/friends';
import ProfilePage from './profile/profile';
import Registration from './auth/registration/registration';
import Posts from './main/posts';
import { ChakraProvider } from '@chakra-ui/react';

const mockPosts = 
[
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  {
    userId: 1,
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  },
  {
    userId: 2,
    id: 17,
    title: "fugit voluptas sed molestias voluptatem provident",
    body: "eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo"
  },
  {
    userId: 2,
    id: 18,
    title: "voluptate et itaque vero tempora molestiae",
    body: "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam"
  },
  {
    userId: 2,
    id: 19,
    title: "adipisci placeat illum aut reiciendis qui",
    body: "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas"
  },
  {
    userId: 2,
    id: 20,
    title: "doloribus ad provident suscipit at",
    body: "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo"
  }
]
const mockUserData = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496"
      }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets"
    }
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618"
      }
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains"
    }
  }

    
];

const mockData = [mockUserData, mockPosts];



it('should log in a previously registered user', () => {
  
  const { getByLabelText, getByText } = render(
    <UserProvider value={{allUsers: mockUserData}}>
      <Router>
      <SignInForm />
      </Router>
    </UserProvider>
  );

  fireEvent.change(getByLabelText("Username"), { target: { value: 'Antonette' } });
  fireEvent.change(getByLabelText("Password"), { target: { value: 'Victor Plains' } });
  fireEvent.click(getByText("Sign in"));

  const storedUser = localStorage.getItem('loggedInUser');
  const user = JSON.parse(storedUser)
  expect(user.username).toBe('Antonette');
});


it('should not log in an invalid user', () => {
  global.alert = jest.fn();
  const { getByLabelText, getByText } = render(
    <UserProvider value={{allUsers: mockUserData}}>
      <Router>
      <SignInForm />
      </Router>
    </UserProvider>
  );

  fireEvent.change(getByLabelText("Username"), { target: { value: 'anika' } });
  fireEvent.change(getByLabelText("Password"), { target: { value: 'password' } });
  fireEvent.click(getByText("Sign in"));

  const error = localStorage.getItem('error');
  expect(error).toBe('invalid user');
});

it('should log in a previously registered user', () => {
  
  const { getByLabelText, getByText } = render(
    <UserProvider value={{allUsers: mockUserData}}>
      <Router>
      <SignInForm />
      </Router>
    </UserProvider>
  );

  fireEvent.change(getByLabelText("Username"), { target: { value: 'Antonette' } });
  fireEvent.change(getByLabelText("Password"), { target: { value: 'Victor Plains' } });
  fireEvent.click(getByText("Sign in"));

  const storedUser = localStorage.getItem('loggedInUser');
  const user = JSON.parse(storedUser)
  expect(user.username).toBe('Antonette');
});


it('should log out a user', () => {
  mockUserData[1] = {
    ...mockUserData[1],
    posts: []
  }
  const { getByText } = render(
    <UserProvider value={{user: mockUserData[1]}}>
      <Router>
        <ChakraProvider>
      <MainPage />
      </ChakraProvider>
      </Router>
    </UserProvider>
  );
  
  fireEvent.click(getByText("Logout"))

  const user = localStorage.getItem('loggedInUser');
  expect(user).toBe("");
});



it('should fetch all articles for current logged in user', () => {
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => setTimeout(() => {
        resolve({
          json: () => Promise.resolve(mockUserData),
        });
      }, 50));
    } else if (url.includes('posts')) {
      return new Promise(resolve => setTimeout(() => {
        resolve({
          json: () => Promise.resolve(mockPosts),
        });
      }, 50));
    }
    return Promise.reject('URL not matched in mock');
  });

  const { getByLabelText, getByText } = render(
    <UserProvider>
      
      <App />
     
    </UserProvider>
  );

  fireEvent.change(getByLabelText("Username"), { target: { value: 'Antonette' } });
  fireEvent.change(getByLabelText("Password"), { target: { value: 'Victor Plains' } });
  fireEvent.click(getByText("Sign in"));
  
   waitFor(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    const user = JSON.parse(storedUser);
    expect(user.posts.length).toBe(4);
  });
});

it('should fetch subset of articles for current logged in user given search keyword', () => {
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => setTimeout(() => {
        resolve({
          json: () => Promise.resolve(mockUserData),
        });
      }, 50));
    } else if (url.includes('posts')) {
      return new Promise(resolve => setTimeout(() => {
        resolve({
          json: () => Promise.resolve(mockPosts),
        });
      }, 50));
    }
    return Promise.reject('URL not matched in mock');
  });
  
  const u = {...mockUserData[1],
          posts: [{
            userId: 2,
            id: 17,
            title: "fugit voluptas sed molestias voluptatem provident",
            body: "eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo",
            u: {
              id: 2,
              name: "Ervin Howell",
              username: "Antonette",
              email: "Shanna@melissa.tv",
              address: {
                street: "Victor Plains",
                suite: "Suite 879",
                city: "Wisokyburgh",
                zipcode: "90566-7771",
                geo: {
                  lat: "-43.9509",
                  lng: "-34.4618"
                }
              },
              phone: "010-692-6593 x09125",
              website: "anastasia.net",
              company: {
                name: "Deckow-Crist",
                catchPhrase: "Proactive didactic contingency",
                bs: "synergize scalable supply-chains"
              }
            }
          },
          {
            userId: 2,
            id: 18,
            title: "voluptate et itaque vero tempora molestiae",
            body: "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam",
            u: {
              id: 2,
              name: "Ervin Howell",
              username: "Antonette",
              email: "Shanna@melissa.tv",
              address: {
                street: "Victor Plains",
                suite: "Suite 879",
                city: "Wisokyburgh",
                zipcode: "90566-7771",
                geo: {
                  lat: "-43.9509",
                  lng: "-34.4618"
                }
              },
              phone: "010-692-6593 x09125",
              website: "anastasia.net",
              company: {
                name: "Deckow-Crist",
                catchPhrase: "Proactive didactic contingency",
                bs: "synergize scalable supply-chains"
              }
            }
          },
          {
            userId: 2,
            id: 19,
            title: "adipisci placeat illum aut reiciendis qui",
            body: "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas",
            u: {
              id: 2,
              name: "Ervin Howell",
              username: "Antonette",
              email: "Shanna@melissa.tv",
              address: {
                street: "Victor Plains",
                suite: "Suite 879",
                city: "Wisokyburgh",
                zipcode: "90566-7771",
                geo: {
                  lat: "-43.9509",
                  lng: "-34.4618"
                }
              },
              phone: "010-692-6593 x09125",
              website: "anastasia.net",
              company: {
                name: "Deckow-Crist",
                catchPhrase: "Proactive didactic contingency",
                bs: "synergize scalable supply-chains"
              }
            }
          },
          {
            userId: 2,
            id: 20,
            title: "doloribus ad provident suscipit at",
            body: "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo",
            u: {
              id: 2,
              name: "Ervin Howell",
              username: "Antonette",
              email: "Shanna@melissa.tv",
              address: {
                street: "Victor Plains",
                suite: "Suite 879",
                city: "Wisokyburgh",
                zipcode: "90566-7771",
                geo: {
                  lat: "-43.9509",
                  lng: "-34.4618"
                }
              },
              phone: "010-692-6593 x09125",
              website: "anastasia.net",
              company: {
                name: "Deckow-Crist",
                catchPhrase: "Proactive didactic contingency",
                bs: "synergize scalable supply-chains"
              }
            }
          }]
        };
  
  const { getByLabelText } = render(
    <UserProvider value={{user: u}}>
      <Router>
      <ChakraProvider>
      <MainPage />
      </ChakraProvider>
      </Router>
    </UserProvider>
  );
  fireEvent.change(getByLabelText("Search for Posts:"), { target: { value: 'illum' } });
   waitFor(() => {
    const filteredPosts = localStorage.getItem('filteredPosts');
    const posts = JSON.parse(filteredPosts);
    console.log(filteredPosts);
    expect(posts[0]).toBe({
      userId: 2,
      id: 19,
      title: "adipisci placeat illum aut reiciendis qui",
      body: "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas"
    });
    expect(posts.length).toBe(1);
 });
});


it('should add articles when adding a follower', () => {
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => setTimeout(() => {
        resolve({
          json: () => Promise.resolve(mockUserData),
        });
      }, 50));
    } else if (url.includes('posts')) {
      return new Promise(resolve => setTimeout(() => {
        resolve({
          json: () => Promise.resolve(mockPosts),
        });
      }, 50));
    }
    return Promise.reject('URL not matched in mock');
  });
  
  const u = {...mockUserData[1],
          posts: [{
            userId: 2,
            id: 17,
            title: "fugit voluptas sed molestias voluptatem provident",
            body: "eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo"
          },
          {
            userId: 2,
            id: 18,
            title: "voluptate et itaque vero tempora molestiae",
            body: "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam"
          },
          {
            userId: 2,
            id: 19,
            title: "adipisci placeat illum aut reiciendis qui",
            body: "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas"
          },
          {
            userId: 2,
            id: 20,
            title: "doloribus ad provident suscipit at",
            body: "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo"
          }],
          follows: [3, 4, 5]
        };
    const u2 = {...mockUserData[0],
      posts: [{
        userId: 1,
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        userId: 1,
        id: 2,
        title: "qui est esse",
        body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      },
      {
        userId: 1,
        id: 3,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
      },
      {
        userId: 1,
        id: 4,
        title: "eum et est occaecati",
        body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
      }],
      follows: [2, 3, 4]
    };
  
  const { getByPlaceholderText, getByText } = render(
    <UserProvider value={{user: u, allUsers: [u, u2]}}>
      <Router>
      <Friends />
      </Router>
    </UserProvider>
  );

  fireEvent.change(getByPlaceholderText("Enter username to follow"), { target: { value: 'Bret' } });
  fireEvent.click(getByText("Add"));

  waitFor(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    const user = JSON.parse(storedUser);
    console.log("user: " + user);
    expect(user.posts.length).toBe(9);
 });
});

it('should fetch the logged in user\'s profile username', () => {
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => setTimeout(() => {
        resolve({
          json: () => Promise.resolve(mockUserData),
        });
      }, 50));
    } else if (url.includes('posts')) {
      return new Promise(resolve => setTimeout(() => {
        resolve({
          json: () => Promise.resolve(mockPosts),
        });
      }, 50));
    }
    return Promise.reject('URL not matched in mock');
  });
  const { getByLabelText, getByTestId, getByText } = render(
    <UserProvider value={{user: mockUserData[1]}}>
      <Router>
      <ChakraProvider>
      <ProfilePage />
      </ChakraProvider>
      </Router>
    </UserProvider>
  );
  const username = getByTestId("username");
  expect(username.textContent).toBe('Antonette');
});

it('should update the user\'s info', () => {
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => setTimeout(() => {
        resolve({
          json: () => Promise.resolve(mockUserData),
        });
      }, 50));
    } else if (url.includes('posts')) {
      return new Promise(resolve => setTimeout(() => {
        resolve({
          json: () => Promise.resolve(mockPosts),
        });
      }, 50));
    }
    return Promise.reject('URL not matched in mock');
  });
  const { getByLabelText, getByTestId, getByText } = render(
    <UserProvider value={{user: mockUserData[1]}}>
      <Router>
      <ChakraProvider>
      <ProfilePage />
      </ChakraProvider>
      </Router>
    </UserProvider>
  );
  fireEvent.change(getByLabelText("Email address"), { target: { value: 'lol@gmail.com' } });
  fireEvent.change(getByLabelText("Username"), { target: { value: 'anika' } });
  fireEvent.change(getByLabelText("Zipcode"), { target: { value: '77005' } });
  fireEvent.change(getByLabelText("Phone Number"), { target: { value: '123-456-7890' } });
  fireEvent.click(getByText("Update"));
  waitFor(() => {
  const username = getByTestId("username");
  const email = getByTestId("email");
  const zip = getByTestId("zip");
  const number = getByTestId("number");
  expect(username.textContent).toBe('anika');
  expect(email.textContent).toBe('lol@gmail.com');
  expect(zip.textContent).toBe('77005');
  expect(number.textContent).toBe('123-456-7890');
  });
});

it('should register a valid user', async () => {
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockUserData),
        }));
      
    } else if (url.includes('posts')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockPosts),
        }));
      
    }
    return Promise.reject('URL not matched in mock');
  });
  const { getByLabelText, getByTestId, getByText } = render(
    <UserProvider value={{user: mockUserData[1]}}>
      <Router>
      <Registration />
      </Router>
    </UserProvider>
  );
  await waitFor(() => {
    fireEvent.change(getByLabelText("Email address"), { target: { value: 'lol@gmail.com' } });
    fireEvent.change(getByLabelText("Username"), { target: { value: 'anika' } });
    fireEvent.change(getByLabelText("Zipcode"), { target: { value: '77005' } });
    fireEvent.change(getByLabelText("Phone Number"), { target: { value: '123-456-7890' } });
    fireEvent.change(getByLabelText("Confirm Password"), { target: { value: '' } });
    fireEvent.change(getByLabelText("Password"), { target: { value: '' } });
});
  fireEvent.click(getByTestId("register"));
  waitFor(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    const user = JSON.parse(storedUser);
    expect(user.username).toBe("anika");
  });

});

it('should set up correct followers', () => {
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => setTimeout(() => {
        resolve({
          json: () => Promise.resolve(mockUserData),
        });
      }, 50));
    } else if (url.includes('posts')) {
      return new Promise(resolve => setTimeout(() => {
        resolve({
          json: () => Promise.resolve(mockPosts),
        });
      }, 50));
    }
    return Promise.reject('URL not matched in mock');
  });

  const { getByLabelText, getByText } = render(
    <UserProvider>
      <Router>
      <SignInForm />
      </Router>
      
     
    </UserProvider>
  );

  fireEvent.change(getByLabelText("Username"), { target: { value: 'Antonette' } });
  fireEvent.change(getByLabelText("Password"), { target: { value: 'Victor Plains' } });
  fireEvent.click(getByText("Sign in"));
  
   waitFor(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    const user = JSON.parse(storedUser);
    expect(user.follows.length).toBe(3);
  });

});

it('should add a post with text', () => {
  const u = {...mockUserData[1],
    posts: [{
      userId: 2,
      id: 17,
      title: "fugit voluptas sed molestias voluptatem provident",
      body: "eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo"
    },
    {
      userId: 2,
      id: 18,
      title: "voluptate et itaque vero tempora molestiae",
      body: "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam"
    },
    {
      userId: 2,
      id: 19,
      title: "adipisci placeat illum aut reiciendis qui",
      body: "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas"
    },
    {
      userId: 2,
      id: 20,
      title: "doloribus ad provident suscipit at",
      body: "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo"
    }],
    follows: [3, 4, 5]
  };
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockUserData),
        }));
      
    } else if (url.includes('posts')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockPosts),
        }));
      
    }
    return Promise.reject('URL not matched in mock');
  });
  const { getByLabelText, getByTestId, getByText } = render(
    <UserProvider value={{user: u, allUsers: mockUserData}}>
      <Router>
      <ChakraProvider>
      <MainPage />
      </ChakraProvider>
      </Router>
    </UserProvider>
  );
  fireEvent.change(getByLabelText("New Post"), { target: { value: 'kjawjhfagwfjh' } });
  fireEvent.click(getByText("Post"));
  waitFor(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    const user = JSON.parse(storedUser);
    expect(user.posts.length).toBe(5);
  });

});

it ('should display friends', () => {
  const u = {...mockUserData[1],
    posts: [{
      userId: 2,
      id: 17,
      title: "fugit voluptas sed molestias voluptatem provident",
      body: "eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo"
    },
    {
      userId: 2,
      id: 18,
      title: "voluptate et itaque vero tempora molestiae",
      body: "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam"
    },
    {
      userId: 2,
      id: 19,
      title: "adipisci placeat illum aut reiciendis qui",
      body: "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas"
    },
    {
      userId: 2,
      id: 20,
      title: "doloribus ad provident suscipit at",
      body: "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo"
    }],
    follows: [1]
  };
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockUserData),
        }));
      
    } else if (url.includes('posts')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockPosts),
        }));
      
    }
    return Promise.reject('URL not matched in mock');
  });
  const { getByLabelText, getByTestId, getByText } = render(
    <UserProvider value={{user: u, allUsers: mockUserData}}>
      <Router>
      <ChakraProvider>
      <MainPage />
      </ChakraProvider>
      </Router>
    </UserProvider>
  );
});

it ('should set new status', () => {
  const u = {...mockUserData[1],
    posts: [{
      userId: 2,
      id: 17,
      title: "fugit voluptas sed molestias voluptatem provident",
      body: "eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo"
    },
    {
      userId: 2,
      id: 18,
      title: "voluptate et itaque vero tempora molestiae",
      body: "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam"
    },
    {
      userId: 2,
      id: 19,
      title: "adipisci placeat illum aut reiciendis qui",
      body: "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas"
    },
    {
      userId: 2,
      id: 20,
      title: "doloribus ad provident suscipit at",
      body: "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo"
    }],
    follows: [1]
  };
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockUserData),
        }));
      
    } else if (url.includes('posts')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockPosts),
        }));
      
    }
    return Promise.reject('URL not matched in mock');
  });
  const { getByLabelText, getByPlaceholderText, getByText } = render(
    <UserProvider value={{user: u, allUsers: mockUserData}}>
      <Router>
      <ChakraProvider>
      <MainPage />
      </ChakraProvider>
      </Router>
    </UserProvider>
  );

  fireEvent.change(getByPlaceholderText("Enter new status."), { target: { value: 'kjawjhfagwfjh' } });
  fireEvent.click(getByText("Update Status"));
  waitFor(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    const user = JSON.parse(storedUser);
    expect(user.posts.length).toBe(5);
  });
});

it ('scrolls through posts', () => {
  const u = {...mockUserData[1],
    posts: [{
      userId: 2,
      id: 17,
      title: "fugit voluptas sed molestias voluptatem provident",
      body: "eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo"
    },
    {
      userId: 2,
      id: 18,
      title: "voluptate et itaque vero tempora molestiae",
      body: "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam"
    },
    {
      userId: 2,
      id: 19,
      title: "adipisci placeat illum aut reiciendis qui",
      body: "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas"
    },
    {
      userId: 2,
      id: 20,
      title: "doloribus ad provident suscipit at",
      body: "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo"
    }],
    follows: [3, 4, 5]
  };
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockUserData),
        }));
      
    } else if (url.includes('posts')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockPosts),
        }));
      
    }
    return Promise.reject('URL not matched in mock');
  });
  const { getByLabelText, getByTestId, getByText } = render(
    <UserProvider value={{user: u, allUsers: mockUserData}}>
      <Router>
      <ChakraProvider>
      <MainPage />
      </ChakraProvider>
      </Router>
    </UserProvider>
  );
  fireEvent.click(getByText("Next"));
  fireEvent.click(getByText("Previous"));
});


it('should not register a user with passwords that do not match', async () => {
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockUserData),
        }));
      
    } else if (url.includes('posts')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockPosts),
        }));
      
    }
    return Promise.reject('URL not matched in mock');
  });
  const { getByLabelText, getByTestId, getByText } = render(
    <UserProvider value={{user: mockUserData[1]}}>
      <Router>
      <Registration />
      </Router>
    </UserProvider>
  );
  await waitFor(() => {
    fireEvent.change(getByLabelText("Email address"), { target: { value: 'lol@gmail.com' } });
    fireEvent.change(getByLabelText("Username"), { target: { value: 'anika' } });
    fireEvent.change(getByLabelText("Zipcode"), { target: { value: '77005' } });
    fireEvent.change(getByLabelText("Phone Number"), { target: { value: '123-456-7890' } });
    fireEvent.change(getByLabelText("Confirm Password"), { target: { value: 'po' } });
    fireEvent.change(getByLabelText("Password"), { target: { value: 'jksbfkj' } });
});
  fireEvent.click(getByTestId("register"));
  waitFor(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    const user = JSON.parse(storedUser);
    expect(user.username).toBe("anika");
  });

});

it('should not register a user with an invalid zipcode', async () => {
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockUserData),
        }));
      
    } else if (url.includes('posts')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockPosts),
        }));
      
    }
    return Promise.reject('URL not matched in mock');
  });
  const { getByLabelText, getByTestId, getByText } = render(
    <UserProvider value={{user: mockUserData[1]}}>
      <Router>
      <Registration />
      </Router>
    </UserProvider>
  );
  await waitFor(() => {
    fireEvent.change(getByLabelText("Email address"), { target: { value: 'lol@gmail.com' } });
    fireEvent.change(getByLabelText("Username"), { target: { value: 'anika' } });
    fireEvent.change(getByLabelText("Zipcode"), { target: { value: '7' } });
    fireEvent.change(getByLabelText("Phone Number"), { target: { value: '123-456-7890' } });
    fireEvent.change(getByLabelText("Confirm Password"), { target: { value: 'po' } });
    fireEvent.change(getByLabelText("Password"), { target: { value: 'po' } });
});
  fireEvent.click(getByTestId("register"));
  waitFor(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    const user = JSON.parse(storedUser);
    expect(user.username).toBe("anika");
  });

});

it('should not register a user with an invalid email', async () => {
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockUserData),
        }));
      
    } else if (url.includes('posts')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockPosts),
        }));
      
    }
    return Promise.reject('URL not matched in mock');
  });
  const { getByLabelText, getByTestId, getByText } = render(
    <UserProvider value={{user: mockUserData[1]}}>
      <Router>
      <Registration />
      </Router>
    </UserProvider>
  );
  await waitFor(() => {
    fireEvent.change(getByLabelText("Email address"), { target: { value: 'invalid' } });
    fireEvent.change(getByLabelText("Username"), { target: { value: 'anika' } });
    fireEvent.change(getByLabelText("Zipcode"), { target: { value: '77005' } });
    fireEvent.change(getByLabelText("Phone Number"), { target: { value: '123-456-7890' } });
    fireEvent.change(getByLabelText("Confirm Password"), { target: { value: 'po' } });
    fireEvent.change(getByLabelText("Password"), { target: { value: 'jksbfkj' } });
});
  fireEvent.click(getByTestId("register"));
  waitFor(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    const user = JSON.parse(storedUser);
    expect(user.username).toBe("anika");
  });

});

it('should not register a user with an invalid phone number', async () => {
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockUserData),
        }));
      
    } else if (url.includes('posts')) {
      return new Promise(resolve => 
        resolve({
          json: () => Promise.resolve(mockPosts),
        }));
      
    }
    return Promise.reject('URL not matched in mock');
  });
  const { getByLabelText, getByTestId, getByText } = render(
    <UserProvider value={{user: mockUserData[1]}}>
      <Router>
      <Registration />
      </Router>
    </UserProvider>
  );
  await waitFor(() => {
    fireEvent.change(getByLabelText("Email address"), { target: { value: 'lol@gmail.com' } });
    fireEvent.change(getByLabelText("Username"), { target: { value: 'anika' } });
    fireEvent.change(getByLabelText("Zipcode"), { target: { value: '77005' } });
    fireEvent.change(getByLabelText("Phone Number"), { target: { value: '123' } });
    fireEvent.change(getByLabelText("Confirm Password"), { target: { value: 'po' } });
    fireEvent.change(getByLabelText("Password"), { target: { value: 'jksbfkj' } });
});
  fireEvent.click(getByTestId("register"));

});

it('should navigate to profile page', () => {
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return new Promise(resolve => setTimeout(() => {
        resolve({
          json: () => Promise.resolve(mockUserData),
        });
      }, 50));
    } else if (url.includes('posts')) {
      return new Promise(resolve => setTimeout(() => {
        resolve({
          json: () => Promise.resolve(mockPosts),
        });
      }, 50));
    }
    return Promise.reject('URL not matched in mock');
  });
  mockUserData[1] = {
    ...mockUserData[1],
    posts: []
  }
  const { getByText } = render(
    <UserProvider value={{user: mockUserData[1]}}>
      <Router>
      <ChakraProvider>
      <MainPage />
      </ChakraProvider>
      </Router>
    </UserProvider>
  );
  
  fireEvent.click(getByText("Profile Page"))
});



