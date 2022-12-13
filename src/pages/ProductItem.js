import React from 'react';
import { isEmptyArray } from '../utility/Utility';
import { Link } from "react-router-dom";

function ProductItem(props) {
  let data = props.data; 
  let product_image = '';
   product_image = !isEmptyArray(data.images) ? data.images[0].src : '';

  return (
    <>
     <div   className="col-md-4 col-sm-6">
                    <div className="product-grid">
                      <div className="product-image">
                        <Link  to={"/product/"+data.slug}  className="" >
                          <img className="pic-1" src={product_image} />
                        </Link>
                        <ul className="social">
                          <li>
                             <Link  to={"/product/"+data.slug}  className=""  data-tip="View Details" >                            
                              <i className="fa fa-search"></i>
                              </Link>
                          </li>

                          <li>
                            <a  data-tip="Add to Wishlist">
                              <i className="fa fa-shopping-bag"></i>
                            </a>
                          </li>
                          <li>
                            <a  data-tip="Add to Cart">
                              <i className="fa fa-shopping-cart"></i>
                            </a>
                          </li>
                        </ul>
                        <span className="product-new-label">Sale</span>
                        <span className="product-discount-label">20%</span>
                      </div>

                      <div className="product-content">
                        <h3 className="title">
                        <Link  to={"/product/"+data.slug}  className="" >   {data.name} </Link>
                        </h3>
                        <div className="price">
                          $16.00
                          <span>$20.00</span>
                        </div>
                        <a className="add-to-cart" href="">
                          + Add To Cart
                        </a>
                      </div>
                    </div>
                  </div>
    
    </>
  )
}
export default ProductItem;