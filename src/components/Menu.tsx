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

  const cartFromLocalStorage = localStorage.getItem("Cart")|| "[]";
  
  const [cartItem, setCartItem] = useState(cartFromLocalStorage);

  const cartLocal = localStorage.setItem("Cart", JSON.stringify(cartItem));

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cartItem));
  }, [cartItem]);

  const onAdd = (product: IIMenu) => {
    const exist: any = menu.find((x: IIMenu) => x.id === product.id);
    if (exist) {
      setCartItem(
        menu.map((x: IIMenu) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );

      console.log(product);
    } else {
      setCartItem([...exist, { ...product, qty: 1 }]);
    }
  };

  // localStorage.setItem("Cart", JSON.stringify(cartItem));

  return <Product menu={menu} onAdd={onAdd} />;
}

export default Menu;
