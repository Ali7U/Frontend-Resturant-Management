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
import Product from "./Product";

function Menu(props: any) {
  const { menu } = props;
  const [cartItem, setCartItem] = useState<IIMenu[]>([]);

  // console.log(JSON.parse(localStorage.getItem("Cart")));

  useEffect(() => {
    setCartItem(JSON.parse(localStorage.getItem("Cart")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cartItem))
  }, [cartItem]);

  const onAdd = (item: IIMenu) => {
    const exist = cartItem.find((x: IIMenu) => x.id === item.id);
    // const cartMap =
    if (exist) {
      setCartItem(
        cartItem.map((x: IIMenu) =>
          x.id === item.id ? { ...exist, qty: (exist.qty || 0) + 1 } : x
        )
      );

      console.log(item);
    } else {
      setCartItem([...cartItem, { ...item, qty: 1 }]);
    }
    // localStorage.setItem("Cart", JSON.stringify(cartItem));
  };
  // localStorage.setItem("Cart", JSON.stringify(cartItem));

  // localStorage.setItem("Cart", JSON.stringify(cartItem));

  return (
    <>
      {/* <Cart cartItem={cartItem} onAdd={onAdd}/> */}
      <Product menu={menu} onAdd={onAdd} />
    </>
  );
}

export default Menu;
