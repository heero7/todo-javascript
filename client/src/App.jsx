import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/som",
    element: <LandingPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: <Home />
  }
])

function App() {
    return (
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
    );
}

export default App;
