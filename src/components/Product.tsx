import { SimpleGrid, Heading, Button, Text, Image, Box } from '@chakra-ui/react';
import React from 'react'
import { IIMenu } from './Interface/InterfaceMenu';

function Product(props:any) {
    const {menu, onAdd} = props
    
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

      {menu.map((item: IIMenu) => (
        <Box borderRadius={10} key={item.id} bg={"#eee"} height="220px" w={250}>
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

export default Product
