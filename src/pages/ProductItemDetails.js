import React, { useEffect, useState } from "react";
import StringUtils from "../utility/StringUtils";
import { isEmptyArray } from "../utility/Utility";
import { useDispatch } from "react-redux";
import {
  addCartProduct,
  calculateTax,
  getCartCount,
  getSubTotal,
  getTotalAmount,
} from "../features/useCartSlice";
import { addWishlistProduct, getWishlistCount } from "../features/useWishlistSlice";

function ProductItemDetails(props) {
  let ProductDetails = props.data;
  const [MainImage, setMainImage] = useState("");
  const dispatch = useDispatch();

  let productObj = {
    id: "",
    title: "",
    price: "",
    image: "",
  };

  useEffect(() => {
    let product_image = "";
    product_image = !isEmptyArray(ProductDetails.images)
      ? ProductDetails.images[0].src
      : "";
    setMainImage(product_image);
  }, []);

  function updateMainImage(e) {
    let product_image = e.target.src ? e.target.src : null;
    setMainImage(product_image);
  }

  const addToCart = (item) => {
    productObj = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: !isEmptyArray(ProductDetails.images)
        ? ProductDetails.images[0].src
        : "",
      slug: item.slug,
    };

    dispatch(addCartProduct(productObj));
    dispatch(getCartCount());
    dispatch(getSubTotal());
    dispatch(calculateTax());
    dispatch(getTotalAmount());
  }; 
  
  const addToWishlist = (item) => {
    productObj = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: !isEmptyArray(ProductDetails.images)
        ? ProductDetails.images[0].src
        : "",
      slug: item.slug,
    };

    dispatch(addWishlistProduct(productObj));
    dispatch(getWishlistCount());     
  };


  return (
    <>
      <div className="row">
        <div className="col-md-6 border-end">
          <div className="d-flex flex-column justify-content-center">
            <div className="main_image">
              <img src={MainImage} id="main_product_image" width="350" />
            </div>
            <div className="thumbnail_images">
              <ul id="thumbnail">
                {ProductDetails.images.map((item) => (
                  <li key={item.id}>
                    <img onClick={updateMainImage} src={item.src} width="70" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-3 right-side">
            <div className="d-flex justify-content-between align-items-center">
              <h2>{ProductDetails.name}</h2>{" "}
              <span role="button" className="heart"  onClick={() => {
                  addToWishlist(ProductDetails);
                }} >
                <i className="fa fa-heart"></i>
              </span>
            </div>
            <div className="mt-2 pr-3 content">
              <p>{StringUtils.removeHtmlTags(ProductDetails.description)}</p>
            </div>

            <h2> INR {ProductDetails.price}</h2>

            <div className="buttons d-flex flex-row mt-5 gap-3">
              <button className="btn btn-outline-dark btn-lg "  onClick={() => {
                  addToWishlist(ProductDetails);
                }}>
                Add to Wishlist
              </button>
              <button
                className="btn btn-dark btn-lg"
                onClick={() => {
                  addToCart(ProductDetails);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductItemDetails;
