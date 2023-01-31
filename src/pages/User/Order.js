import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; 
import { Client } from "../../api/Client";
import { Endpoint } from "../../Events/Endpoint";
import { removeLoginUser } from "../../features/useUserSlice";
import { isEmptyArray } from "../../utility/Utility";

import banner_image from "./../../assets/images/backgound.jpg";
import LeftSidebar from "./LeftSidebar";

function Order() {

    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { UserLoginData, LoginId } = useSelector((state) => state.user);

    const [orderListing, setOrderListing] = useState([]);

 
    console.log("UserLoginData: ",UserLoginData);
    console.log("LoginId: ",LoginId);


    useEffect(() => { 
      if(isEmptyArray(UserLoginData)){
        navigate('/login');
      }  
    });

    useEffect(() => {
        getOrders();
      }, []);


    function getOrders() {
        let url = Endpoint.GET_ORDER_LISTING+`&customer=`+LoginId;
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
                    <span className="breadcrumb-item active">Order</span>
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

            <div  className="col-sm-3 hidden-xs">
              <LeftSidebar />
            </div>

            <div  className="col-sm-9 pt-1 ">

            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                        <td className="text-right">Order ID</td>
                        <td className="text-left">Customer</td>
                        <td className="text-right">No. of Products</td>
                        <td className="text-left">Status</td>
                        <td className="text-right">Total</td>
                        <td className="text-left">Date Added</td>
                        <td></td>
                        </tr>
                    </thead>
                    <tbody>

                    {!isEmptyArray(orderListing) ? (

                        orderListing.map((value, key) => (

                        <tr>
                        <td className="text-right">#{value.id}</td>
                        <td className="text-left">{value.billing.first_name}</td>
                        
                        <td className="text-right">{(value.line_items).length}</td>
                        <td className="text-left">{value.status}</td>
                        <td className="text-left">{value.currency} {value.total}</td>
                        <td className="text-right">{value.date_created}</td> 
                        <td className="text-right">
                         <Link  to={"/order/"+value.id} data-toggle="tooltip" title="" className="btn btn-info" data-original-title="View"><i className="fa fa-eye"></i></Link>
                        </td>
                        </tr>

                        ))

                        )
                    :

                    (<tr><td className="text-center" colSpan={8}>No order found.</td></tr>)
                    
                    }

                    </tbody>
                    </table>
                </div>


            </div>

          </div> 
        </div>
      </div>
    </>
  );
}
export default Order;
