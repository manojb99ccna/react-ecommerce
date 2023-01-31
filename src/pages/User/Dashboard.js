import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; 
import { removeLoginUser } from "../../features/useUserSlice";
import { isEmptyArray } from "../../utility/Utility";

import banner_image from "./../../assets/images/backgound.jpg";
import LeftSidebar from "./LeftSidebar";

function Dashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { UserLoginData, LoginId } = useSelector((state) => state.user);
 
    console.log("UserLoginData: ",UserLoginData);
    console.log("LoginId: ",LoginId);


    useEffect(() => {

      if(isEmptyArray(UserLoginData)){

        navigate('/login');


      }
      
    });

   


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
                    <span className="breadcrumb-item active">Dashboard</span>
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

              <h2>Welcome back {UserLoginData.username} </h2>  


            </div>

          </div> 
        </div>
      </div>
    </>
  );
}
export default Dashboard;
