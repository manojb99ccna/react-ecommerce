import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCartProduct, calculateTax, decrement, getCartCount, getCartProducts, getSubTotal, getTotalAmount, increment, removeCartItem } from '../features/useCartSlice';
import { getWishlistCount, removeWishlistItem } from '../features/useWishlistSlice';
import { isEmptyArray } from '../utility/Utility';
import banner_image from './../assets/images/backgound.jpg';

function Wishlist() {

    const dispatch = useDispatch() 
    const { totalWishlistCount,WishlistItems } = useSelector((state) => state.wishList);
    let productObj = {
        id: '',
        title: '',
        price: '',
        image: '',
        slug: '',
    }

    useEffect(() => {        
      }, [dispatch])

    
     
      const addToCart = (item) => {
    
        productObj = {
         id: item.id,
         name: item.name,
         price: item.price,
         image: !isEmptyArray(item.image) ? item.image : '',
         slug: item.slug,
       }
       
       dispatch(addCartProduct(productObj));
       dispatch(getCartCount());
       dispatch(getSubTotal());
       dispatch(calculateTax());
       dispatch(getTotalAmount()); 
     }

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
                            <span className="breadcrumb-item active">Wishlist</span>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  

    <div className="wrapper mtb--40">
        <div className="container">


        {!isEmptyArray(WishlistItems) ?

            <>
            <table className="table table-hover mb-3 cart-table">
            <thead>
                <tr>
                <th colSpan={2}>Product</th> 
                <th className="text-center">Price</th> 
                <th></th>
                </tr>
            </thead>
            <tbody> 
            { 
            WishlistItems.map((product, index) => {
                return (
                    <tr key={product.id}> 
                     <td className="col-md-1" >
                      <div className="media"> 
                        <Link  to={"/product/"+product.slug}  className="thumbnail pull-left" > 
                          <img className="media-object" src={product.image} alt={product.name} />
                        </Link>                         
                      </div>
                    </td> 
                     <td className="col-md-3"><div className='h3'><Link  to={"/product/"+product.slug}  className="" > {product.name}</Link></div></td>   
                     
                    <td className="col-sm-1 col-md-1 text-center">
                      <strong>INR {product.price}</strong>
                    </td>
                     
                    <td className="col-sm-1 col-md-1">
                    <a  data-tip="Add to Cart"  onClick={() => {
                  addToCart(product)
                }} >
                              <i className="font-1 fa fa-shopping-cart"></i>
                            </a>

                            &nbsp; &nbsp;

                      <button
                        type="button"
                        onClick={() => {
                          dispatch(removeWishlistItem(product.id))
                          dispatch(getWishlistCount()) 
                        }}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className='font-1 fa fa-close'></i>
                      </button>
                    </td>
                  </tr>
                )
                })

            }
            </tbody>
            </table>
 
            
            </>
            : 
            <>
            <h2 className="h2 text-center mb-3">Your Wishlist is empty</h2>
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
export default Wishlist;