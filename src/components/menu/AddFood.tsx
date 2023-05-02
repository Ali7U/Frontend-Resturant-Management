import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { IIMenu } from "../Interface/InterfaceMenu";
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

const AddFood = () => {
  const initialMenuState = {
    id: null,
    foodName: "",
    price: 0,
    img: "",
  };
  const [newMenu, setNewMenu] = useState<IIMenu>(initialMenuState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async () => {
    const addData = {
      foodName: newMenu.foodName,
      price: newMenu.price,
      img: newMenu.img,
    };
    await fetch("http://localhost:3003/foods/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addData),
    });
    setSubmitted(true);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewMenu({ ...newMenu, [name]: value });
  };

  const setNewData = () => {
    setNewMenu(initialMenuState);
    setSubmitted(false);
  };



  return (
    <Box h={"100vh"}>
      <Center>
        {submitted ? (
          <Box p={50}>
            <Heading size={"md"}>You submitted successfully!</Heading>
            <Button
              p={25}
              m={"20px auto"}
              colorScheme={"blue"}
              onClick={setNewData}
            >
              Add
            </Button>
          </Box>
        ) : (
          <SimpleGrid columns={1} w={"50%"}>
            <Box>
              <Text>Title</Text>
              <Input
                type="text"
                required
                value={newMenu.foodName}
                onChange={handleInputChange}
                name="foodName"
              />
            </Box>

            <Box>
              <Text>price</Text>
              <Input
                type="number"
                required
                value={newMenu.price}
                onChange={handleInputChange}
                name="price"
              />
            </Box>
            <Box>
              <Text>img</Text>
              <Input
                type="text"
                required
                value={newMenu.img}
                onChange={handleInputChange}
                name="img"
              />
            </Box>

            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </SimpleGrid>
        )}
      </Center>
    </Box>
  );
};

export default AddFood;
