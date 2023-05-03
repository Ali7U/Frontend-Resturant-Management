import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "../Nav";
import SignUp from "../Auth/SignUp";
import SignIn from "../Auth/SignIn";
import Main from "../pages/Main";
import AddFood from "../menu/AddFood";
import Cart from "../pages/Cart";
import { IIMenu } from "../Interface/InterfaceMenu";

function Routers() {
  let getToken = localStorage.getItem("Cart");


  return (
    <>
      <Nav  />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Main />} />
        <Route path="/foods" element={<AddFood />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default Routers;
