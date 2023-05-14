import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Button,
  Center,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IIMenu } from "../Interface/InterfaceMenu";
import CartManagement from "../CartManagement";

function Cart(props: any) {
  const { product } = props;

  // const [postData, setPostData] = useState<IIMenu[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("Cart") as string) || []
  );

  const itemPrice = cartItems.reduce(
    (acc: number, curr: { price: number; qty: number }) =>
      acc + curr.price * curr.qty,
    0
  );
  const taxPrice = itemPrice * 0.15;
  const totalPrice = itemPrice + taxPrice;

  const handleSubmit = async () => {
    try {
      cartItems.forEach((item: IIMenu) => {
        console.log("item: ", JSON.stringify(item));

        const addData = {
          foodName: item.foodName,
          price: item.price,
          qty: item.qty,
          total: totalPrice,
        };

        console.log("item: ", JSON.stringify(addData));
        fetch("http://localhost:3003/order/newOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addData),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((e) => console.log(`There is an error ${e}`));
      });

      setSubmitted(true);
      setCartItems([]);
      localStorage.setItem("Cart", '[]');
      console.log(cartItems.length);

      // setPostData(addData);
    } catch (e) {
      console.log(`there is an error ${e}`);
    }
  };

  const onAdd = (item: IIMenu) => {
    const exist = cartItems.find((x: IIMenu) => x.id === item.id);
    // const cartMap =
    if (exist) {
      setCartItems(
        cartItems.map((x: IIMenu) =>
          x.id === item.id ? { ...exist, qty: (exist.qty || 0) + 1 } : x
        )
      );

      console.log(item);
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
    // localStorage.setItem("Cart", JSON.stringify(cartItem));
  };

  const onRemove = (item: IIMenu) => {
    const exist = cartItems.find((x: IIMenu) => x.id === item.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x: IIMenu) => x.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((x: IIMenu) =>
          x.id === item.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    <Center>
      <Box
        height={"auto"}
        w={"50%"}
        bg={"#ccc4"}
        p={15}
        mt={10}
        borderRadius={15}
        width={600}
      >
        {cartItems.length === 0 && <Box>cart is empty</Box>}

        {cartItems.map((item: IIMenu) => (
          <>
            <SimpleGrid columns={5} w={500}>
              <Text key={item.id}>{item.foodName}</Text>
              <Button
                w={20}
                onClick={() => {
                  // rerender()
                  onRemove(item);
                }}
              >
                -
              </Button>
              <Text>{item.qty}</Text>
              <Button w={70} onClick={() => onAdd(item)}>
                +
              </Button>
              <Text>{item.price.toFixed(2)}</Text>
            </SimpleGrid>
          </>
        ))}
        {cartItems.length !== 0 && (
          <>
            <hr />
            <Flex justifyContent={"space-around"}>
              <Box>
                <Text>price</Text>
                <Text>{itemPrice.toFixed(2)}</Text>
              </Box>
              <Box>
                <Text>tax price</Text>
                <Text>{taxPrice.toFixed(2)}</Text>
              </Box>
              <Box>
                <Text>total price</Text>
                <Text>{totalPrice.toFixed(2)}</Text>
              </Box>
            </Flex>
            <Button colorScheme="blue" onClick={handleSubmit}>
              order now
            </Button>
          </>
        )}
      </Box>
    </Center>
  );
}

export default Cart;
