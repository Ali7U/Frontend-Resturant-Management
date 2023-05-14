import { Button, Center, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Management() {
  return (
    <Center>
      <SimpleGrid columns={2} alignItems={"center"} columnGap={350} h={"80vh"} >
        <Link to={"/sales"}>
          <Button colorScheme="blue" w={"200px"} h={"150px"}>
            Sales
          </Button>
        </Link>{" "}
        <Link to={"/foods"}>
          <Button colorScheme="blue" w={"200px"} h={"150px"}>
            Add
          </Button>
        </Link>
      </SimpleGrid>
    </Center>
  );
}

export default Management;
