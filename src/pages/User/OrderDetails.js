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
                            <b>Order ID:</b> #{orderListing.id}
                            <br />
                            <b>Date Added:</b> {orderListing.date_created}
                          </td>
                          <td className="text-left">
                            <b>Payment Method:</b>{" "}
                            {orderListing.payment_method_title}
                            <br />
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
                          <td className="text-left">
                            {orderListing.billing.first_name}{" "}
                            {orderListing.billing.last_name}
                            <br />
                            {orderListing.billing.address_1}{" "}
                            {orderListing.billing.address_2}
                            <br />
                            {orderListing.billing.city}
                            <br />
                            {orderListing.billing.state}{" "}
                            {orderListing.billing.postcode}{" "}
                            {orderListing.billing.country}
                            <br />
                            {orderListing.billing.email}
                            <br />
                            {orderListing.billing.phone}
                          </td>

                          <td className="text-left">
                            {orderListing.shipping.first_name}{" "}
                            {orderListing.shipping.last_name}
                            <br />
                            {orderListing.shipping.address_1}{" "}
                            {orderListing.shipping.address_2}
                            <br />
                            {orderListing.shipping.city}
                            <br />
                            {orderListing.shipping.state}{" "}
                            {orderListing.shipping.postcode}{" "}
                            {orderListing.shipping.country}
                            <br />
                            {orderListing.shipping.email}
                            <br />
                            {orderListing.shipping.phone}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th className="text-left">Item</th>
                          <th className="text-right">Cost</th>
                          <th className="text-left">Qty</th>
                          <th className="text-left">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!isEmptyArray(orderListing.line_items) &&
                          orderListing.line_items.map((value, key) => (
                            <tr key={key}>
                              <td className="text-left">{value.name}</td>
                              <td className="text-right">{orderListing.currency}  {value.price}</td>
                              <td className="text-left">{value.quantity}</td>
                              <td className="text-left">{orderListing.currency}  {value.total}</td>
                            </tr>
                          ))}

                        {!isEmptyArray(orderListing.shipping_lines) &&
                          orderListing.shipping_lines.map((value, key) => (
                            <tr key={key + 1001}>
                              <td colSpan={3} className="text-left">
                                {value.method_title}
                              </td>

                              <td className="text-left">{orderListing.currency}  {value.total}</td>
                            </tr>
                          ))}

                        <tr>
                          <td colSpan={3} className="text-left"></td>

                          <td className="text-left">
                            <strong>Item Subtotal :</strong>
                            {orderListing.currency}  {(orderListing.total-orderListing.shipping_total)}
                            <br />

                            <strong>Shipping: </strong>
                            {orderListing.currency}  {orderListing.shipping_total}
                            <br />
 

                            
                            <strong>Total: </strong>{orderListing.currency} {orderListing.total}
                          </td>
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
