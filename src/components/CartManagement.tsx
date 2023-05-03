import { Box } from '@chakra-ui/react'
import React from 'react'
import { IIMenu } from './Interface/InterfaceMenu'

function CartManagement(props:any) {
    const {cartItem, product, onAdd} = props
  return (
    
    <Box height={"100vh"} w={1000} bg={"red"}>
      {/* {cartItem.map((item:IIMenu) =>(
        item.price
      ))} */}
    </Box>
  )
}

export default CartManagement
