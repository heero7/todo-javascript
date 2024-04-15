import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Button, 
  Input,
  Heading,
  Center, 
  Box,
  Stack,
  VStack
} from '@chakra-ui/react';



function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailValueChange = (event) => setEmail(event.target.value);
  const handlePasswordValueChange = (event) => setPassword(event.target.value);

  async function login(email, creds) {
    const result = await fetch("http://localhost:7200/signin", {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: email, password: creds })
    });

    if (result.status !== 200) {
      // do something.. something bad happened.
      return;
    }

    const token = await result.json();
    localStorage.setItem("token", JSON.stringify(token));

    // Redirect to the home page.
    navigate("/home");
  }

  return (
    <VStack spacing='200px'>
      <Box></Box>
      <Box position='relative'>
        <Center>
          <Card>
            <CardHeader>
              <Center>
                <Heading>Login</Heading>
              </Center>
            </CardHeader>
            <CardBody>
              <Stack spacing='4'>
                <Input placeholder='Email Address' onChange={handleEmailValueChange} />
                <Input placeholder='Password' type='password' onChange={handlePasswordValueChange} />
              </Stack>
            </CardBody>
            <CardFooter>
                <Button width='480px' onClick={() => login(email, password)} >Login</Button>
            </CardFooter>
          </Card>
        </Center>
      </Box>
    </VStack>
  );
}

export default LoginPage;
