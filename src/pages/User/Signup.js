import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Client } from "../../api/Client";
import Emitter from "../../Events/Emitter";
import { Endpoint } from "../../Events/Endpoint"; 
import EventName from "../../Events/EventName";
import { addLoginUser } from "../../features/useUserSlice";

import banner_image from "./../../assets/images/backgound.jpg";

function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();

    const { UserLoginData } = useSelector((state) => state.user);

    const { register,handleSubmit,formState: { errors },} = useForm();
    const [errMessage, setErrMessage] = useState('');

    const onSubmit = (data) => {
        console.log(data);
        
        let url = Endpoint.USER_REG; 
        let inputjson = {
          "first_name": data.first_name,
          "last_name": data.last_name,  
          
          "username": data.Email,
            "email": data.Email,
            "password": data.Password             
          }

          Client.postWithLoader(url, inputjson, true, (response) => {
        
                console.log("response = ",response);
                console.log("response.data = ",response.data);

                if(response.data.status == true){

                  //dispatch(addLoginUser(inputjson));


                  Emitter.emit(EventName.ALERT_MESSAGE.SUCCESS,{ message: "Success: Registration successfully. Please login to access your data."}); 
                  
                  (location.pathname=='/checkout/signup') ? navigate('/checkout/login') : navigate('/login');


                }else{

                  setErrMessage(response.data.message);
                  setTimeout(() => {
                    setErrMessage("");
                  }, 3000);

                }


            },
            (error) => {
                
                console.log(error);

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
                    <span className="breadcrumb-item active">Signup</span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper mtb--40">
        <div className="container">

          <div className="Auth-form-container mt-5 mb-5 ">
            <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}  >
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Signup </h3>



                <div className="form-group mt-3">
                  <label>First name</label>
                  <input
                        type="text"
                        id="first_name" 
                        placeholder="Enter First name" 
                        className="form-control"
                        {...register("first_name", { required: true, maxLength: 25, minLength: 3 })}
                    />
                    {errors.first_name && errors.first_name.type === "required" && (
                    <span className="text-danger" role="alert">This is required</span>
                    )}
                    {errors.first_name && errors.first_name.type === "minLength" && (
                        <span className="text-danger" role="alert">First name should be atleast 6 digit.</span>
                    )} 
                    {errors.first_name && errors.first_name.type === "maxLength" && (
                        <span className="text-danger" role="alert">Max length exceeded</span>
                    )} 
                </div>

                <div className="form-group mt-3">
                  <label>Last name</label>
                  <input
                        type="text"
                        id="last_name" 
                        placeholder="Enter Last name" 
                        className="form-control"
                        {...register("last_name", { required: true, maxLength: 25, minLength: 3 })}
                    />
                    {errors.last_name && errors.last_name.type === "required" && (
                    <span className="text-danger" role="alert">This is required</span>
                    )}
                    {errors.last_name && errors.last_name.type === "minLength" && (
                        <span className="text-danger" role="alert">Last name should be atleast 6 digit.</span>
                    )} 
                    {errors.last_name && errors.last_name.type === "maxLength" && (
                        <span className="text-danger" role="alert">Max length exceeded</span>
                    )} 
                </div>


                <div className="form-group mt-3">
                  <label>Email address</label>
                  <input
                        type="email"
                        id="Email" 
                        placeholder="Enter your email id" 
                        className="form-control"
                        {...register("Email",
                        {
                            required: true,
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                    />
                    {errors.Email && errors.Email.type === "required" && (
                        <span className="text-danger" role="alert">This is required</span>
                        )}
                        {errors.Email && errors.Email.type === "pattern" && (
                            <span className="text-danger" role="alert">Email id is not valid.</span>
                        )} 
                </div>

                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                        type="password"
                        id="Password" 
                        placeholder="Enter your Password" 
                        className="form-control"
                        {...register("Password", { required: true, maxLength: 25, minLength: 6 })}
                    />
                    {errors.Password && errors.Password.type === "required" && (
                    <span className="text-danger" role="alert">This is required</span>
                    )}
                    {errors.Password && errors.Password.type === "minLength" && (
                        <span className="text-danger" role="alert">Password number should be atleast 6 digit.</span>
                    )} 
                    {errors.Password && errors.Password.type === "maxLength" && (
                        <span className="text-danger" role="alert">Max length exceeded</span>
                    )} 
                </div>

                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>


                 <div className="row">
                  
                  <p className="col-sm-12 forgot-password text-right mt-2">
                    For  <Link to="/login"> Login</Link>
                  </p>
 

                  </div>     
                

              </div>

              {(errMessage != "") && <div className="col-sm-12 alert-danger alert">{errMessage}</div> }

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
