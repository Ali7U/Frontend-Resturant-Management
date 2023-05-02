import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function SignUp(props: any) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("users")));
  const navigate = useNavigate();

  localStorage.setItem("users", JSON.stringify(user));

  const postData = async () => {
    try {
      const addUser = {
        username: username,
        email: email,
        password: password,
      };

      const response = await fetch("http://localhost:3003/users/", {
        method: "POST",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify(addUser),
      });
      const data = await response.json();
      if (data.error) {
        props.history.push("/error", {
          error: data.error,
        });
      }

      setUser((userArray: any) => [...userArray, addUser]);
      navigate('/signin')
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   const fetchData = fetch("http://localhost:3003/users/", {
  //     username: username,
  //   });
  // });

  return (
    <Center>
      <FormControl>
        <SimpleGrid
          rowGap={5}
          border={"1px #444"}
          m={"40px auto"}
          w={"50%"}
          p={10}
          borderRadius={15}
          boxShadow={"0 0 5px #ccc"}
        >
          <Heading as="h3" size="lg" textAlign={"center"}>
            Register
          </Heading>
          <Box>
            <FormLabel>username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
          </Box>
          <Box>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </Box>
          <Box>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </Box>
          <Button onClick={postData}>Sign Up</Button>
        </SimpleGrid>
      </FormControl>
    </Center>
  );
}
// localStorage.clear()

export default SignUp;
