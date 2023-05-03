import { Box, Button, Center } from "@chakra-ui/react";
import Menu from "../Menu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IIMenu } from "../Interface/InterfaceMenu";

function Main(props: any) {
  // const { onAdd, menu } = props;
  const [menu, setMenu] = useState([]);


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

  function addFood() {
    return (
      <Link to={"/foods"}>
        <Center p={15}>
          <Button colorScheme="blue">Management</Button>
        </Center>
      </Link>
    );
  }

  function parseJwt(token: string) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  function token() {
    return parseJwt(localStorage.getItem("token")).role === "ADMIN"
      ? addFood()
      : console.log("fff");
  }

  return (
    <>
      {token()}
      <Menu  menu={menu} />
    </>
  );
}

export default Main;
