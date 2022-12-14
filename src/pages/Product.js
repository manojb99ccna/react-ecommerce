import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Client } from "../api/Client";
import { Endpoint } from "../Events/Endpoint";
import { isEmptyArray } from "../utility/Utility";
import banner_image from "./../assets/images/backgound.jpg";
import ProductItem from "./ProductItem";


function Product(props) {

  const [currentPageCat, setCurrentPageCat] = useState(1);
  const [totalPagesCat, setTotalPagesCat] = useState( 20 );
  const [categoryFilter, setCategoryFilter]           = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState( 9 ); 
	const [errMessage, setError]      = useState( '' );
	const [posts, setPosts]           = useState( '' );

  const inputRef = React.createRef();

  useEffect( () => { 
    console.log("\n useEffect"); 

    filterSidebar(); 
    filterProduct();

  }, [currentPage] ); 

  function filterSidebar(){   

    const url = Endpoint.GET_CATEGORY_LISTING_FILTER +`?page=${ currentPageCat }&per_page=${totalPagesCat}`; 
    console.log(url);

    Client.getWithLoader(url,(response) => { 
        console.log("category response",response.data); 
        setCategoryFilter( response.data ); 
      },
      (error) => {
        setCategoryFilter([]); 
      }
    ); 

  }

  const onChange = event => {
    console.log("onChange :",inputRef);

    let { value } = event.target;

    console.log("onChange event :",event);
    console.log("onChange value :",value);


  }

  function filterProduct(){   
    
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
    
   } 
 

  return (
    <>
      <div
        className="cod__bradcaump__area mb-5"
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
                    ref={inputRef} 
                    name="searchTxt"
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-secondary wd-btn-search"
                      type="button"
                       onClick={onChange}
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
                {!isEmptyArray(categoryFilter) && 

                  categoryFilter.map((value, key) => ( 
                  <p key={key} className="col-category  finder-page ">
                    <label>
                      <input
                        ref={inputRef}
                        onChange={onChange}
                        id="category_1"
                        name="filter_category[]"
                        type="checkbox"
                        value={value.id}
                        className="filter-category"
                      />{" "} {value.name}
                    </label>
                  </p>
                   ))

                }
 
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