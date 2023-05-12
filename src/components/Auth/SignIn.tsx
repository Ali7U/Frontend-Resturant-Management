import {
  Center,
  FormControl,
  SimpleGrid,
  Heading,
  FormLabel,
  Input,
  Button,
  Box,
  useToast,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IIUser } from "../Interface/InterfaceUser";
import Nav from "../Nav";
import Main from "../pages/Main";
import { Link } from "react-router-dom";

function SignIn() {
  // const [signIn, serSignIn] = useState<{}>([{email: "", password:}])
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const verifyUser = {
    email: email,
    password: password,
  };
  const toast = useToast();

  const submitLogin = async () => {
    try {
      const request = await fetch("http://localhost:3003/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({ email, password }),
      });
      const data: IIUser = await request.json();
      if (request.status !== 200) {
        toast({
          title: "data.message",
          status: "error",
          duration: 3000,
          position: "top",
        });
        return;
      }
      // localStorage.clear()
      toast({
        title: `Welcome ${email} ${data.role}`,
        status: "success",
        duration: 3000,
        position: "top",
      });

      localStorage.setItem("token", data.token);
      <Main
        role={data.role}
        id={data.id}
        username={data.username}
        email={email}
        password={password}
        token={data.token}
      />;
      navigate("/");
    } catch (error) {
      toast({
        title: "Server Error !",
        status: "error",
        duration: 3000,
        position: "top",
      });
    }
  };

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
            Sign In
          </Heading>
          <Box>
            <FormLabel>email</FormLabel>
            <Input
              type="text"
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
          <Button onClick={submitLogin}>Log IN</Button>
          <Link to={"/signup"}>
            <Text>Don't have account ?</Text>
          </Link>
        </SimpleGrid>
      </FormControl>
    </Center>
  );
}

export default SignIn;
