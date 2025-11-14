import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import CharacterList from './pages/CharacterList';
import CharacterDetails from './pages/CharacterDetails';
import Login from './pages/Login';

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
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;