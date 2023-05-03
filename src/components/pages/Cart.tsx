import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Button,
  Center,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IIMenu } from "../Interface/InterfaceMenu";
import CartManagement from "../CartManagement";

function Cart(props: any) {
  const { product, onAdd } = props;

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );
  // localStorage.clear()

  const itemPrice = cartItems.reduce(
    (acc: number, curr: { price: number; qty: number }) =>
      acc + curr.price * curr.qty,
    0
  );
  const taxPrice = itemPrice * 0.15;
  const shippingPrice = itemPrice > 40 ? 0 : 20;
  const totalPrice = itemPrice + shippingPrice + taxPrice;

  return (
    <Center>

    <Box height={"100vh"} w={"50%"} bg={"red"} p={15} borderRadius={15}>
      {cartItems.length === 0 && <div className="block">cart is empty</div>}

        {cartItems.map((item: IIMenu, i:any) => (
          <>
      <SimpleGrid columns={4} w={500} key={i}>
              <Text>{item.foodName}</Text>
              <Button w={50} onClick={() => onAdd(item)}>+</Button>
              <Text>{item.qty}</Text>
              <Button w={50} onClick={() => onAdd(item)}>+</Button>
              <Text>{item.price}</Text>
      </SimpleGrid>
          </>
        ))}
      <Box>Hello</Box>
    </Box>
          </Center>
  );
}

export default Cart;
