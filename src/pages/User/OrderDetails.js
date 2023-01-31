import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Client } from "../../api/Client";
import { consumer_key, consumer_secret, Endpoint } from "../../Events/Endpoint";
import { removeLoginUser } from "../../features/useUserSlice";
import { isEmptyArray } from "../../utility/Utility";

import banner_image from "./../../assets/images/backgound.jpg";
import LeftSidebar from "./LeftSidebar";

function OrderDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { UserLoginData, LoginId } = useSelector((state) => state.user);

  const { id } = useParams();

  const [orderListing, setOrderListing] = useState([]);

  console.log("UserLoginData: ", UserLoginData);
  console.log("LoginId: ", LoginId);
  console.log("id: ", id);

  useEffect(() => {
    if (isEmptyArray(UserLoginData)) {
      navigate("/login");
    }
  });

  useEffect(() => {
    getOrders();
  }, []);

  function getOrders() {
    let url =
      Endpoint.GET_ORDER_DETAILS +
      `/` +
      id +
      "?consumer_key=" +
      consumer_key +
      "&consumer_secret=" +
      consumer_secret;
    Client.getWithLoader(
      url,
      (response) => {
        setOrderListing(response.data);
      },
      (error) => {
        setOrderListing([]);
      }
    );
  }

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
                    <span className="breadcrumb-item active">
                      Order details
                    </span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper mtb--40">
        <div className="container">
          <div className="row">
            <div className="col-sm-3 hidden-xs">
              <LeftSidebar />
            </div>

            <div className="col-sm-9 pt-1 ">
              <div className="table-responsive">
                {!isEmptyArray(orderListing) ? (
                  <>
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <td className="text-left" colSpan="2">
                            Order Details
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-left">
                            <b>Order ID:</b> #1
                            <br />
                            <b>Date Added:</b> 31/01/2023
                          </td>
                          <td className="text-left">
                            <b>Payment Method:</b> Cash On Delivery
                            <br />
                            <b>Shipping Method:</b> Flat Shipping Rate
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <td className="text-left">Payment Address</td>
                          <td className="text-left">Shipping Address</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-left"></td>

                          <td className="text-left"></td>
                        </tr>
                      </tbody>
                    </table>

                    
                  </>
                ) : (
                  <h3 className="text-center">No order found.</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderDetails;
