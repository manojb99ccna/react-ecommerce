import React from "react";
import { Link } from "react-router-dom";
import banner_image from "./../assets/images/backgound.jpg";

export default function NotFound() {
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
                    <span className="breadcrumb-item active">404</span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper mtb--40">
        <div className="container">
          <div className='text-center'>
            
          <h2 >Ooops! Sorry, Page Not Found</h2>

          <br />

          <Link className="btn btn-dark btn-lg " to="/">  Back home  </Link>
                
            
          </div>
        </div>
      </div>
    </>
  );
}
