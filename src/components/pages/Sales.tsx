import {
  Box,
  Center,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IIMenu } from "../Interface/InterfaceMenu";
// import { format } from "date-fns";

// const date = new Date();
// const formattedDate = format(date, "dd-MM-yyyyTHH:MM:SSZ");
// console.log(formattedDate);

import moment from 'moment';




function Sales() {
  const [sales, setSales] = useState<IIMenu[]>([]);

  useEffect(() => {
    const getSales = async () => {
      await fetch("http://localhost:3003/order")
        .then((res) => res.json())
        .then((data) => setSales(data))
        .catch((e) => console.log(`there is an error ${e}`));
    };

    getSales();
  }, []);

  return (
    <Center>
      <TableContainer mt={10} boxShadow={"0 0 5px"}>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Product name</Th>
              <Th>Quantity</Th>
              <Th isNumeric>Price</Th>
              <Th>Order date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sales.map((item) => (
              <Tr key={item.id}>
                <Td>{item.foodName}</Td>
                <Td>{item.qty}</Td>
                <Td isNumeric>{item.price}</Td>
                <Td isNumeric>{moment(item.onCreated).format("DD-MM-yyyy HH:MM:SS")}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Center>
  );
}

export default Sales;
// console.log(new Date());
