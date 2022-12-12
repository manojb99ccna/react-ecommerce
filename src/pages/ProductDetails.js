import React, { useEffect } from 'react';
import banner_image from "./../assets/images/backgound.jpg";
import { Link, useLocation, useParams } from "react-router-dom";

function ProductDetails() {

  
  const { slug } = useParams();
 
  console.log("slug = ",slug);


  
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
                    <span className="breadcrumb-item active">Products name</span>
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

export default ProductDetails;