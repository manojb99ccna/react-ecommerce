import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { calculateTax, decrement, getCartCount, getCartProducts, getSubTotal, getTotalAmount, increment, removeCartItem } from '../features/useCartSlice';
import { isEmptyArray } from '../utility/Utility';
import banner_image from './../assets/images/backgound.jpg';

function Cart() {

    const dispatch = useDispatch()
    const { cartItems, subAmount,  totalAmount } = useSelector(
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
                            <span className="breadcrumb-item active">Cart</span>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  

    <div className="wrapper mtb--40">
        <div className="container">


        {!isEmptyArray(cartItems) ?

            <>
            <table className="table table-hover mb-3 cart-table">
            <thead>
                <tr>
                <th>Product</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Price</th>
                <th className="text-center">Total</th>
                </tr>
            </thead>
            <tbody> 
            { 
            cartItems.map((product, index) => {
                return (
                    <tr key={product.id}> 
                     <td className="col-md-4">
                      <div className="media">
                        <a className="thumbnail pull-left" href="/#">
                          <img className="media-object" src={product.image} alt={product.title} />
                        </a>
                      </div>
                    </td>

                    <td className="col-sm-1 col-md-2 text-center">
                      <div className="cart-quantity">
                       
                      <button
                          className="btn btn-sm inline-block"
                          onClick={() => {
                            dispatch(decrement(product.id))
                            dispatch(getSubTotal())
                            dispatch(getCartCount())
                            dispatch(calculateTax())
                            dispatch(getTotalAmount())
                          }}
                        >
                        <i className='fa fa-minus'></i>
                          
                        </button>
                        <span className="text-center inline-block">
                          {product.quantity}
                        </span>
                        <button
                          className="btn btn-sm inline-block"
                          onClick={() => {
                            dispatch(increment(product.id))
                            dispatch(getSubTotal())
                            dispatch(getCartCount())
                            dispatch(calculateTax())
                            dispatch(getTotalAmount())
                          }}
                        >
                           <i className='fa fa-plus'></i>
                        </button>
                      </div>
                    </td>
                    <td className="col-sm-1 col-md-1 text-center">
                      <strong>INR {product.price}</strong>
                    </td>
                    <td className="col-sm-1 col-md-1 text-center">
                      <strong>
                       INR {parseFloat(product.price * product.quantity).toFixed(
                          2,
                        )}
                      </strong>
                    </td>
                    <td className="col-sm-1 col-md-1">
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(removeCartItem(product.id))
                          dispatch(getSubTotal())
                          dispatch(getCartCount())
                          dispatch(calculateTax())
                          dispatch(getTotalAmount())
                        }}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className='fa fa-close'></i>
                      </button>
                    </td>
                  </tr>
                )
                })

            }
            </tbody>
            </table>

            <div className="col-md-12 cart">
            <div className="col-md-6 p-4 offset-md-6 border alert alert-secondary">
                
                <div className="d-flex gst">
                <div className="flex-grow-1">Subtotal</div>INR
                {parseFloat(subAmount).toFixed(2)}
                </div>
                <hr />
                <div className="d-flex">
                <div className="flex-grow-1">
                    <strong>Total Amount</strong>
                </div>
                <div>
                    <strong>INR {parseFloat(totalAmount).toFixed(2)}</strong>
                </div>
                </div>
                <div className="d-grid mt-3">
                <Link type="button" className="btn btn-dark"  to="/checkout" >
                    Proceed to Checkout
                </Link>
                </div>
            </div>
            </div>
            
            </>
            : 
            <>
            <h2 className="h2 text-center mb-3">Your cart is empty</h2>
            <div className="text-center">
            <Link to="/product" className="btn btn-danger">
                Shop now
            </Link>
            </div>
            </>
        }


        </div>
    </div>
    </>
  )
}
export default Cart;