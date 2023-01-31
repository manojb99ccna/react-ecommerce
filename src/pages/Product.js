import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Client } from "../api/Client"; 
import { Endpoint } from "../Events/Endpoint";
import StringUtils from "../utility/StringUtils";
import { isEmpty, isEmptyArray } from "../utility/Utility";
import banner_image from "./../assets/images/backgound.jpg";
import ProductItem from "./ProductItem";

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryFilter : [],
      categoryFilterIds : [],
      posts : [],
      filterInputCategory: [],
    }
    this.currentPage = 1;
    this.totalPages = 21;

    this.currentPageCat = 1;
    this.totalPagesCat = 20;

    
  }

  componentDidMount() {
    this.filterSidebar(); 
    this.filterProduct();
  }


  filterSidebar(){  
    const url = Endpoint.GET_CATEGORY_LISTING_FILTER +`&page=${ this.currentPageCat }&per_page=${this.totalPagesCat}`;  
    Client.getWithLoader(url,(response) => {
        this.setState({categoryFilter: response.data});
      },
      (error) => {
        this.setState({categoryFilter: [] });
      }
    ); 
  }

  filterProduct(){    
    let url = Endpoint.GET_PRODUCT_LISTING +`&page=${ this.currentPage }&per_page=${this.totalPages}`; 
    if(StringUtils.isNotEmpty(this.state.filterInputCategory)){
       url = url +`&category=${ this.state.filterInputCategory }`; 
    } 

    Client.getWithLoader(url,(response) => {      
      this.setState({posts: response.data});
      },
      (error) => {
         
      }
    ); 
   } 

   clearFilter(){
    console.log("ClearFilter");
  }


   render() {
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

               
              {/* <div className="sidebar-search">
                <div className="input-group wd-btn-group col-12 p0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search ..."
                    aria-label="Search for..."
                    ref={this.inputRef}
                    name="searchTxt"
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-secondary wd-btn-search"
                      type="button"
                      onClick={this.profuctFilter}
                    >
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </span>
                </div>
              </div>
                */}

              
              
              <div className="side-bar side-bar--filter" attr-val="category">
                {/* 
                <div>
                  <a
                    type="button"
                    className="filter-opt button"
                    attr-title="filter-category"
                    onClick={this.clearFilter}
                  >
                    Clear filter
                  </a>
                </div>
                
              */}
              <br />
 

                <h5 className="title">Category</h5>
                <div className="div-con-filter">
                {!isEmptyArray(this.state.categoryFilter) && 

                  this.state.categoryFilter.map((value, key) => ( 
                  <p key={key} className="col-category  finder-page ">
                    <label>
                      <input 
                        
                        id="category_1"
                        name="filter_category" 
                        type="checkbox" 
                        value={this.state.filterInputCategory} 
                        className="filter-category" 
                        onChange={(e) => {
                          
                          if (e.target.checked) { 
                            this.setState({ 
                              filterInputCategory: [...this.state.filterInputCategory, value.id]
                          }, () => {
                            this.filterProduct();
                        });

                             
                          } else {

                            this.setState({filterInputCategory: this.state.filterInputCategory.filter((e) => e !== value.id)  }, () => {
                              this.filterProduct();
                          });
                            
                          }
                        }}
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

                
                 
                {!isEmptyArray(this.state.posts) ?  
                  <>
                  {this.state.posts.map((value, key) => ( 

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
      )
   }


}
export default Product;