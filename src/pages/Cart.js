import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Cart() {

    const dispatch = useDispatch();
    const { totalCount, cartItems, subAmount, tax, totalAmount } = useSelector((state) => state.cart);
    const [isMiniCartShow, setIsMiniCartShow] = useState(false);

    console.log("cartItems",cartItems);

  return (
    <>
    
    
    </>
  )
}
export default Cart;