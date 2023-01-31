import React, { useEffect, useState } from "react";
import banner_image from "./../assets/images/backgound.jpg";
import { Link, useLocation, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Endpoint } from "../Events/Endpoint";
import { Client } from "../api/Client";
import { isEmptyArray } from "../utility/Utility";
import ProductItemDetails from "./ProductItemDetails";

function ProductDetails() {
  const { slug } = useParams();

  const [errMessage, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [postStatus, setPostStatus] = useState(false);

  console.log("slug = ", slug);

  useEffect(() => {
    const url = Endpoint.GET_PRODUCT_LISTING + `&slug=${slug}`;
    console.log(url);

    Client.getWithLoader(
      url,
      (response) => {
        console.log("response", response.data);
        setPosts(response.data);
        setPostStatus(true);
      },
      (error) => {
        setPostStatus(true);
        setError("No posts found");
      }
    );
  }, []);

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
                    <span className="breadcrumb-item active">
                      Products name
                    </span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Container className="main-container">
        {postStatus === true && (
          <>
            {!isEmptyArray(posts) ? (
              <div className="card">
                <>
                  {posts.map((value, key) => (
                    <ProductItemDetails data={value} key={key} />
                  ))}
                </>
              </div>
            ) : (
              <div className="row">
                <h3 className="col-sm-12 alert text-center border-danger text-danger ">
                  No product details found
                </h3>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default ProductDetails;
