import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { calculateTax, getCartCount, getCartProducts, getSubTotal, getTotalAmount } from '../features/useCartSlice';
import banner_image from './../assets/images/backgound.jpg';

 function Checkout() {

    const dispatch = useDispatch()
    const { cartItems, subAmount, tax, totalAmount } = useSelector(
        (state) => state.cart,
    )

    useEffect(() => {
        dispatch(getCartProducts())
        dispatch(getSubTotal())
        dispatch(getCartCount())
        dispatch(calculateTax())
        dispatch(getTotalAmount())
      }, [dispatch])

  return (
    <>
     <div className="cod__bradcaump__area" style={{ backgroundImage: `url(${banner_image})`, backgroundRepeat: "no-repeat" ,backgroundSize: "cover" }} >
        <div className="cod__bradcaump__wrap">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="bradcaump__inner">
                            <nav className="bradcaump-inner">
                             <Link className="breadcrumb-item" to="/">Home</Link> 
                            <span className="brd-separetor"><i className="icon icon-arrow-right"></i></span>
                            <span className="breadcrumb-item active">Checkout</span>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
    
    
    
    </>
  )
}
export default Checkout;
