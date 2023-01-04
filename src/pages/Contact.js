import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { Client } from "../api/Client";
import { Endpoint } from "../Events/Endpoint";
import StringUtils from "../utility/StringUtils";
import banner_image from "./../assets/images/backgound.jpg";

function Contact() {

    const [successMessage, setSuccess] = useState(false);
    const [errMessage, setError] = useState('');

    const { register,handleSubmit,formState: { errors },} = useForm();
    
    const onSubmit = (data) => {
        console.log(data);
        

        let url = Endpoint.SUBMIT_CONTACT_FORM; 
        
        var inputJSON = new FormData();
        inputJSON.append('_wpcf7', '2190');
        inputJSON.append('_wpcf7_version', '5.7.2');
        inputJSON.append('_wpcf7_locale', 'en_US');
        inputJSON.append('_wpcf7_unit_tag', ' wpcf7-f2190-p2-o1');
        inputJSON.append('_wpcf7_container_post', ' 2');
        inputJSON.append('_wpcf7_posted_data_hash', ' ');
        inputJSON.append('Firstname', data.Firstname);
        inputJSON.append('Lastname', data.Lastname);
        inputJSON.append('Phone', data.Phone);
        inputJSON.append('Email', data.Email);
        inputJSON.append('Message',data.Message);

      Client.postWithLoader(url, inputJSON, true, (response) => {
        
          console.log(response.data.status);

          if(StringUtils.isNotEmpty(response.data.status)){
            if(response.data.status == 'mail_sent'){
              setSuccess(true);
            }else{
              setError(response.data.message);
              setTimeout(() => {
                setError("");
              }, 3000);

            }
          } 
        
        
        },
        (error) => {
            
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
                    <span className="breadcrumb-item active">Contact</span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper mtb--40">
        <div className="container">

        {(successMessage) ?
                    
                    <div className="alert alert-success pt-5 pb-5 text-center">
                            <h1>Thank you for your message. It has been sent.</h1>
                    </div>  
                   :   

          <form  onSubmit={handleSubmit(onSubmit)} >
            <div className="row mb-4">
              <div className="col">
                <div className="form-outline">
                  <label className="form-label" htmlFor="Firstname">
                    First name
                  </label>
                  <input
                    type="text"
                    id="Firstname"
                    placeholder="Enter your first name" 
                    className="form-control"
                    {...register("Firstname", { required: true, maxLength: 10 })}
                  />
                 
                    {errors.Firstname && errors.Firstname.type === "required" && (
                    <span className="text-danger" role="alert">This is required</span>
                    )}
                    {errors.Firstname && errors.Firstname.type === "maxLength" && (
                        <span className="text-danger" role="alert">Max length exceeded</span>
                    )}                
                </div>
              </div>

              <div className="col">
                <div className="form-outline">
                  <label className="form-label" htmlFor="Lastname">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="Lastname"
                    placeholder="Enter your last name" 
                    className="form-control"
                    {...register("Lastname", { required: true, maxLength: 10 })}
                  />
                  {errors.Lastname && errors.Lastname.type === "required" && (
                    <span className="text-danger" role="alert">This is required</span>
                    )}
                    {errors.Lastname && errors.Lastname.type === "maxLength" && (
                        <span className="text-danger" role="alert">Max length exceeded</span>
                    )} 
                </div>
              </div>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="Email">
                Email
              </label>
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

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="Phone">
                Phone
              </label>
              <input
                type="number"
                id="Phone" 
                placeholder="Enter your Phone number" 
                className="form-control"
                {...register("Phone", { required: true, maxLength: 10, minLength: 10 })}
              />
              {errors.Phone && errors.Phone.type === "required" && (
                <span className="text-danger" role="alert">This is required</span>
                )}
                {errors.Phone && errors.Phone.type === "minLength" && (
                    <span className="text-danger" role="alert">Phone number should be atleast 10 digit.</span>
                )} 
                {errors.Phone && errors.Phone.type === "maxLength" && (
                    <span className="text-danger" role="alert">Max length exceeded</span>
                )} 
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="Message">
                Message
              </label>
              <textarea
                className="form-control"
                id="Message"
                placeholder="Enter your Message description" 
                rows="4"
                {...register("Message", { required: true, maxLength: 300, minLength: 30 })}
              ></textarea>
              {errors.Message && errors.Message.type === "required" && (
                <span className="text-danger" role="alert">This is required</span>
                )}
                {errors.Message && errors.Message.type === "minLength" && (
                    <span className="text-danger" role="alert">Message should be atleast 30 character.</span>
                )} 
                {errors.Message && errors.Message.type === "maxLength" && (
                    <span className="text-danger" role="alert">Message should not be more than 300 character.</span>
                )} 
            </div>

             
              {(errMessage != "") && <div className="col-sm-12 alert-danger alert">{errMessage}</div> }
               

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Submit
            </button>
          </form>

                } 
                  


        </div>
      </div>
    </>
  );
}
export default Contact;