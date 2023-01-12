import logo from './../assets/images/logo/logo.png';
import React, { Component, useState } from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmptyArray } from '../utility/Utility';
import { useDispatch } from 'react-redux';
import { addCartProduct, calculateTax, getCartCount, getSubTotal, getTotalAmount, removeCartItem } from '../features/useCartSlice';


export default function Header() {

    const dispatch = useDispatch();
    const { totalCount, cartItems, subAmount, tax, totalAmount } = useSelector((state) => state.cart);
    const { totalWishlistCount } = useSelector((state) => state.wishList);
    const [isMiniCartShow, setIsMiniCartShow] = useState(false);

    
  return (
    <>

        <header id="cod__header" className="cod__header__area header--one ">
        
        <div id="sticky-header-with-topbar" className="mainmenu__wrap sticky__header">
            <div className="container">
                <div className="row">
                    <div className="menumenu__container clearfix">
                        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-5"> 
                            <div className="logo">
                                <Link className="" to="/">
                                    <img alt="avatar" src={logo} className={''} />
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-7 col-lg-8 col-sm-5 col-xs-3">
                            <nav className="main__menu__nav hidden-xs hidden-sm">
                                <ul className="main__menu">
                                     <Navigation /> 
                                </ul>

                            </nav>

                            
                            <div className="mobile-menu clearfix visible-xs visible-sm">
                                <nav id="mobile_dropdown">
                                    <ul>
                                    <Navigation />                                        
                                    </ul>
                                </nav>
                            </div>  
                        </div>
                        <div className="col-md-3 col-lg-2 col-sm-4 col-xs-4">
                            <div className="header__right"> 
                                <div className="cod__shopping__cart "> 
                                    <Link to="/wishlist"  className="cart__menu" ><i className="fa fa-heart"></i></Link> 
                                    <Link to="/wishlist"  className="cart__menu" ><span className="cod__qua">{totalWishlistCount}</span></Link>
                                </div>

                                <div className='header__account'><a></a></div>

                                <div className="cod__shopping__cart" onClick={()=>{  setIsMiniCartShow(true);   }} >
                                    <a className="cart__menu" ><i className="icon-handbag icons"></i></a> 
                                    <a className="cart__menu" ><span className="cod__qua">{totalCount}</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mobile-menu-area"></div>
            </div>
        </div>        
    </header>

    {(isMiniCartShow) &&  
    <>
    <div className="body__overlay is-visible" onClick={()=>{  setIsMiniCartShow(false);   }} ></div>
    <div className="shopping__cart shopping__cart__on">
        <div className="shopping__cart__inner">
            <div className="offsetmenu__close__btn">
                <a href="#"><i className="zmdi zmdi-close"></i></a>
            </div>
            {!isEmptyArray(cartItems) ? <>
            <div className="shp__cart__wrap">
                
                { 

                    cartItems.map((product, index) => {
                        return (
                            <div className="shp__single__product">
                                <div className="shp__pro__thumb">
                                    <a href="#">
                                        <img src={product.image} alt={product.name} />
                                    </a>
                                </div>
                                <div className="shp__pro__details">
                                    <h2><a href="product-details.php">{product.name}</a></h2>
                                    <span className="quantity">QTY: {product.quantity}</span>
                                    <span className="shp__price">INR {parseFloat(product.price * product.quantity).toFixed(2,)}</span>
                                </div>
                                <div className="remove__btn">
                                    <a href="#" title="Remove this item"
                                     onClick={() => {
                                        dispatch(removeCartItem(product.id))
                                        dispatch(getSubTotal())
                                        dispatch(getCartCount())
                                        dispatch(calculateTax())
                                        dispatch(getTotalAmount())
                                        }}
                        ><i className="fa fa-close"></i></a>
                                </div>
                            </div>
                        )
                 })
                }
                
            </div>
            <ul className="shoping__total">
                <li className="subtotal">Subtotal:</li>
                <li className="total__price">INR {parseFloat(totalAmount).toFixed(2)}</li>
            </ul>
            

            <ul className="shopping__btn">
                <li><Link  onClick={()=>{  setIsMiniCartShow(false);   }} className="" to="/cart">View Cart</Link></li>
                <li className="shp__checkout"><Link onClick={()=>{  setIsMiniCartShow(false);   }} className="" to="/checkout">Checkout</Link></li>
            </ul>

            </>
            :
            <>
            <div className="shp__cart__wrap">
            <div className="shp__single__product"> <h2 className="h3 text-center mb-3">Your cart is empty</h2> </div>
            </div>
            </>
            }
            
            
        </div>
    </div>
    </>
    }


    </>
  )
}
