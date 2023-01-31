import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Client } from "../../api/Client";
import { Endpoint } from "../../Events/Endpoint"; 
import { addLoginUser } from "../../features/useUserSlice";

import banner_image from "./../../assets/images/backgound.jpg";

function Password() {

    const dispatch = useDispatch();
    const { UserLoginData } = useSelector((state) => state.user);

    const { register,handleSubmit,formState: { errors },} = useForm();
    const [errMessage, setErrMessage] = useState('');

    const onSubmit = (data) => {
        console.log(data);
        
        let url = Endpoint.USER_LOGIN; 
        let inputjson = {
            "username": data.Email 
          }

          Client.postWithLoader(url, inputjson, true, (response) => {
        
                console.log("response = ",response);
                console.log("response.data = ",response.data);

                if(response.data.status == true){

                  //dispatch(addLoginUser(inputjson));

                   


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
                    <span className="breadcrumb-item active">Password</span>
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
                <h3 className="Auth-form-title">Get Password </h3>
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
export default Password;
