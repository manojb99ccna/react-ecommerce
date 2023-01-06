import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Navbar, Nav, Container, Carousel } from "react-bootstrap";
import { Endpoint } from "../Events/Endpoint";
import { Client } from "../api/Client";
import { isEmptyArray } from "../utility/Utility";
import StringUtils from "../utility/StringUtils";
import ProductItem from "./ProductItem";

function Home() {
  const [sliderData, setSlider] = useState([]);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    getSlider();
    getLatestProduct();
  }, []);

  function getLatestProduct() {
    let url = Endpoint.GET_PRODUCT_LISTING + `?page=1&per_page=12`;
    Client.getWithLoader(
      url,
      (response) => {
        setLatestProduct(response.data);
      },
      (error) => {
        setLatestProduct([]);
      }
    );
  }

  function getSlider() {
    const url = Endpoint.HOME_SLIDER_LIST;
    Client.getWithLoader(
      url,
      (response) => {
        console.log("response", response.data.data);
        if (!isEmptyArray(response.data)) {
          if (response.data.status) {
            setSlider(response.data.data);
          }
        }
      },
      (error) => {
        setSlider([]);
      }
    );
  }

  function getSliderLayoutOne(data) {
    return (
      <div className="container">
        <div className="row align-items__center">
          <div className="col-lg-6 col-sm-5 col-xs-12 col-md-5">
            <div className="slide__thumb text-left">
              <img src={data.image} alt={data.title} />
            </div>
          </div>

          <div className="col-md-7 col-sm-7 col-xs-12 col-lg-6">
            <div className="slide">
              <div className="slider__inner">
                <h2>{data.description}</h2>
                <h1>{data.title}</h1>

                {StringUtils.isNotEmpty(data.shop_url) && (
                  <div className="cr__btn">
                    <a href={data.shop_url}>Shop Now</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function getSliderLayoutTwo(data) {
    return (
      <div className="container">
        <div className="row align-items__center">
          <div className="col-md-7 col-sm-7 col-xs-12 col-lg-6">
            <div className="slide">
              <div className="slider__inner">
                <h2>{data.description} </h2>
                <h1>{data.title}</h1>

                {StringUtils.isNotEmpty(data.shop_url) && (
                  <div className="cr__btn">
                    <a href={data.shop_url}>Shop Now</a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-5 col-xs-12 col-md-5 text-right ">
            <div className="slide__thumb">
              <img src={data.image} className="pull-right" alt={data.title} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    
      {!isEmptyArray(sliderData) && (
        <Carousel className="bg-gray">
          {sliderData.map((data, key) => (
            <Carousel.Item key={key}>
              {key / 2 != 0
                ? getSliderLayoutOne(data)
                : getSliderLayoutTwo(data)}
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {!isEmptyArray(latestProduct) && (
        <>
          <div className="container mb--30 mt--120">
            <div className="row">
              <div className="col-xs-12">
                <div className="section__title--2 text-center">
                  <h2 className="title__line">New Products</h2>
                </div>
              </div>

              <div className="col-xs-12  mt--30">
                <div className="featured-products ">
                  {latestProduct.map((value, key) => (
                    <ProductItem data={value} key={key} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </>
  );
}
export default Home;
