import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "../Nav";
import SignUp from "../Auth/SignUp";
import SignIn from "../Auth/SignIn";
import Main from "../pages/Main";
import AddFood from "../menu/AddFood";
import Cart from "../pages/Cart";
import { IIMenu } from "../Interface/InterfaceMenu";
import Management from "../pages/Management";
import E404 from "../pages/E404";
import Sales from "../pages/Sales";
import { useColorMode } from "@chakra-ui/react";

function Routers() {

  // let getToken = localStorage.getItem("Cart")?.length;


  return (
    <>
      <Nav/>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Main />} />
        <Route path="/foods" element={<AddFood />} />
        <Route path="/management" element={<Management />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<E404 />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </>
  );
}

export default Routers;
