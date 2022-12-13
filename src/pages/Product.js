import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Client } from "../api/Client";
import { Endpoint } from "../Events/Endpoint";
import { isEmptyArray } from "../utility/Utility";
import banner_image from "./../assets/images/backgound.jpg";
import ProductItem from "./ProductItem";


function Product(props) {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState( 9 );
	const [loading, setLoading]       = useState( false );
	const [errMessage, setError]      = useState( '' );
	const [posts, setPosts]           = useState( '' );


  useEffect( () => { 
    console.log("\n useEffect");

    const url = Endpoint.GET_PRODUCT_LISTING +`?page=${ currentPage }&per_page=${totalPages}`; 
    console.log(url);

    Client.getWithLoader(url,(response) => { 
      console.log("response",response.data); 
      setPosts( response.data ); 

    },
    (error) => {
      setError( 'No posts found' );
    }
  ); 

  }, [currentPage] ); 

 

  return (
    <>
      <div
        className="cod__bradcaump__area"
        style={{
          backgroundImage: `url(${banner_image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="cod__bradcaump__wrap">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="bradcaump__inner">
                  <nav className="bradcaump-inner">
                    <Link className="breadcrumb-item" to="/">
                      Home
                    </Link>
                    <span className="brd-separetor">
                      <i className="icon icon-arrow-right"></i>
                    </span>
                    <span className="breadcrumb-item active">Products</span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="product__grid_category">
        <div className="container">
          <div className="row">

            <div
              className="col-12 col-md-4 col-lg-3 display-none-md"
              id="filters"
            >
              <div className="sidebar-search">
                <div className="input-group wd-btn-group col-12 p0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search ..."
                    aria-label="Search for..."
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-secondary wd-btn-search"
                      type="button"
                    >
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </span>
                </div>
              </div>

              <div className="side-bar side-bar--filter" attr-val="category">
                <div>
                  <a
                    
                    className="filter-opt button"
                    attr-title="filter-category"
                  >
                    Clear filter
                  </a>
                </div>
                <br />
                <h5 className="title">Category</h5>
                <div className="div-con-filter">
                  <p className="col-category  finder-page ">
                    <label>
                      <input
                        id="category_1"
                        name="filter_category"
                        type="checkbox"
                        value="1"
                        className="filter-category"
                      />{" "}
                      Fruits & Vegetables
                    </label>
                  </p>

                  <p className="col-category  finder-page ">
                    <label>
                      <input
                        id="category_2"
                        name="filter_category"
                        type="checkbox"
                        value="2"
                        className="filter-category"
                      />{" "}
                      Breakfast
                    </label>
                  </p>

                  <p className="col-category  finder-page ">
                    <label>
                      <input
                        id="category_3"
                        name="filter_category"
                        type="checkbox"
                        value="3"
                        className="filter-category"
                      />{" "}
                      Grocery
                    </label>
                  </p>

                  <p className="col-category  finder-page ">
                    <label>
                      <input
                        id="category_4"
                        name="filter_category"
                        type="checkbox"
                        value="4"
                        className="filter-category"
                      />{" "}
                      Household
                    </label>
                  </p>

                  <p className="col-category  finder-page ">
                    <label>
                      <input
                        id="category_5"
                        name="filter_category"
                        type="checkbox"
                        value="5"
                        className="filter-category"
                      />{" "}
                      Personal Care
                    </label>
                  </p>

                  <p className="col-category  finder-page ">
                    <label>
                      <input
                        id="category_6"
                        name="filter_category"
                        type="checkbox"
                        value="6"
                        className="filter-category"
                      />{" "}
                      Confectionary
                    </label>
                  </p>

                  <p className="col-category  finder-page ">
                    <label>
                      <input
                        id="category_7"
                        name="filter_category"
                        type="checkbox"
                        value="7"
                        className="filter-category"
                      />{" "}
                      Beverages
                    </label>
                  </p>
                </div>
              </div>

              <div className="side-bar side-bar--filter" attr-val="price">
                <div>
                  <a
                     
                    className="filter-opt button"
                    attr-title="filter-price"
                  >
                    Clear filter
                  </a>
                </div>
                <br />
                <h5 className="title">Price</h5>
                <div className="div-con-filter">
                  <p className="col-price  finder-page ">
                    <label>
                      <input
                        id="price_1"
                        name="filter_price"
                        type="checkbox"
                        value="0-20"
                        className="filter-price"
                      />{" "}
                      Less than Rs 20{" "}
                    </label>
                  </p>
                  <p className="col-price  finder-page ">
                    <label>
                      <input
                        id="price_2"
                        name="filter_price"
                        type="checkbox"
                        value="21-50"
                        className="filter-price"
                      />{" "}
                      Rs 21 to Rs 50{" "}
                    </label>
                  </p>
                  <p className="col-price  finder-page ">
                    <label>
                      <input
                        id="price_3"
                        name="filter_price"
                        type="checkbox"
                        value="51-100"
                        className="filter-price"
                      />{" "}
                      Rs 51 to Rs 100{" "}
                    </label>
                  </p>
                  <p className="col-price  finder-page ">
                    <label>
                      <input
                        id="price_4"
                        name="filter_price"
                        type="checkbox"
                        value="101-200"
                        className="filter-price"
                      />{" "}
                      Rs 101 to Rs 200{" "}
                    </label>
                  </p>
                  <p className="col-price  finder-page ">
                    <label>
                      <input
                        id="price_5"
                        name="filter_price"
                        type="checkbox"
                        value="201-500"
                        className="filter-price"
                      />{" "}
                      Rs 201 to Rs 500{" "}
                    </label>
                  </p>
                  <p className="col-price  finder-page ">
                    <label>
                      <input
                        id="price_6"
                        name="filter_price"
                        type="checkbox"
                        value="501-900000"
                        className="filter-price"
                      />{" "}
                      More than Rs 501{" "}
                    </label>
                  </p>
                </div>
              </div>

              <div className="side-bar side-bar--filter" attr-val="discount">
                <div>
                  <a
                     
                    className="filter-opt button"
                    attr-title="filter-discount"
                  >
                    Clear filter
                  </a>
                </div>
                <br />
                <h5 className="title">Discount</h5>
                <div className="div-con-filter">
                  <p className="col-discount  finder-page ">
                    <label>
                      <input
                        id="discount_1"
                        name="filter_discount"
                        type="checkbox"
                        value="1-5"
                        className="filter-discount"
                      />{" "}
                      Upto 5%{" "}
                    </label>
                  </p>
                  <p className="col-discount  finder-page ">
                    <label>
                      <input
                        id="discount_2"
                        name="filter_discount"
                        type="checkbox"
                        value="5-10"
                        className="filter-discount"
                      />{" "}
                      5% - 10%{" "}
                    </label>
                  </p>
                  <p className="col-discount  finder-page ">
                    <label>
                      <input
                        id="discount_3"
                        name="filter_discount"
                        type="checkbox"
                        value="10-15"
                        className="filter-discount"
                      />{" "}
                      10% - 15%{" "}
                    </label>
                  </p>
                  <p className="col-discount  finder-page ">
                    <label>
                      <input
                        id="discount_4"
                        name="filter_discount"
                        type="checkbox"
                        value="15-20"
                        className="filter-discount"
                      />{" "}
                      15% - 20%{" "}
                    </label>
                  </p>
                  <p className="col-discount  finder-page ">
                    <label>
                      <input
                        id="discount_5"
                        name="filter_discount"
                        type="checkbox"
                        value="25-100"
                        className="filter-discount"
                      />{" "}
                      More than 25%{" "}
                    </label>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-12 col-lg-9 ">
              <div className="row">
                <div id="allproduct" className="">

                
                 
                {!isEmptyArray(posts) ?  
                  <>
                  {posts.map((value, key) => ( 

                   <ProductItem data={value} key={key} /> 

                  ))}
                  </>                  
                :
                <><h3 className="text-center alert">No product found</h3></>
                
                } 
                


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Product;