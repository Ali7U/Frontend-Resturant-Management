import {
  SimpleGrid,
  Heading,
  Box,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IIMenu } from "./Interface/InterfaceMenu";
import Cart from "./pages/Cart";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      await fetch("http://localhost:3003/foods/")
        .then((res) => res.json())
        .then((data) => setMenu(data));
    };

    //    let fetchDa: IIMenu[] = [fetchData];
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const onAdd = (product: IIMenu) => {
    const exist = menu.find((x: IIMenu) => x.id === product.id);
    if (exist) {
      setMenu(
        menu.map((x: any) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
      <Cart setCartItem={product} />
    } else {
      setMenu([...menu, { ...product, qty: 1 }]);
    }
  };
  return (
    <SimpleGrid
      p={"15"}
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(4, 1fr)",
      ]}
      gap={15}
      justifyItems={"center"}
    >
      {/* <Wrap> */}

      {menu.map((item: IIMenu, index) => (
        <Box borderRadius={10} key={index} bg={"#eee"} height="220px" w={250}>
          <Image
            src={item.img}
            w={"100%"}
            height={150}
            borderRadius={"10px 10px 0 0"}
          />
          <Heading as={"h2"} size={"md"} textAlign={"center"}>
            {item.foodName}
          </Heading>
          <Text>{item.price}</Text>
          <Button colorScheme="blue" fontSize={12} onClick={() => onAdd(item)}>
            Add to cart
          </Button>
        </Box>
      ))}
      {/* </Wrap> */}
    </SimpleGrid>
  );
}

export default Menu;
