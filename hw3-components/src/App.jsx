import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import CharacterList from './pages/CharacterList';
import CharacterDetails from './pages/CharacterDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/characters',
        element: <CharacterList />
      },
      {
        path: '/characters/:id',
        element: <CharacterDetails />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/profile',
        element: <Profile />
      }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;