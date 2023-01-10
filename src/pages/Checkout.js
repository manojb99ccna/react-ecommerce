import React, { useCallback, useEffect, useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Client } from '../api/Client';
import { Endpoint } from '../Events/Endpoint';
import { calculateTax, getCartCount, getCartProducts, getSubTotal, getTotalAmount, removeCartItem } from '../features/useCartSlice';
import StringUtils from '../utility/StringUtils';
import { isEmptyArray } from '../utility/Utility';
import banner_image from './../assets/images/backgound.jpg';

 function Checkout() {

    const [successMessage, setSuccess] = useState(false);
    const { register,handleSubmit,formState: { errors },} = useForm();

    const dispatch = useDispatch()
    const { cartItems, subAmount, tax, totalAmount } = useSelector(
        (state) => state.cart,
    ) 

    useEffect(() => {
        dispatch(getCartProducts())
        dispatch(getSubTotal())
        dispatch(getCartCount())
        dispatch(calculateTax())
        dispatch(getTotalAmount())
      }, [dispatch])

      function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    

 
    async function onSubmit(data) {
        console.log(data);

        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        } 
    

        const result = {
            amount: (totalAmount) ? totalAmount*100 : 0,
            currency: 'INR',
            receipt: 'receipt_order_'+Math.floor(Math.random()*90000) + 10000,
          };         
         
          console.log("result=",result);

          const { amount, id: order_id, currency } = result;
          const options = {
            key: "rzp_test_yWvuJP2kZhTzaj", 
            amount: amount.toString(),
            currency: currency,
            name: data.first_name,
            description: "",
            image: '',
            order_id: order_id,
            handler: async function (response) {
                const response_data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                console.log("response",response);    
                console.log("response_data",response_data);    
                
                /**/ 

                let line_items = [];
                cartItems.map((product, index) => {
                    line_items.push({
                        "product_id": product.id,
                        "quantity": product.quantity
                      });
                })

                
                let inputjsonOrder = {
                    "payment_method": "razorpay",
                    "payment_method_title": "Credit Card/Debit Card/NetBanking",
                    "status": "processing",
                  
                    "billing": {
                      "first_name": data.first_name,
                      "last_name": data.last_name,
                      "address_1": data.address_1,
                      "address_2": "",
                      "city": data.city,
                      "state": data.state,
                      "postcode": data.postcode,
                      "country": data.country,
                      "email": data.email,
                      "phone": data.phone
                    },
                    "shipping": {
                      "first_name": data.first_name,
                      "last_name": data.last_name,
                      "address_1": data.address_1,
                      "address_2": "",
                      "city": data.city,
                      "state": data.state,
                      "postcode": data.postcode,
                      "country": data.country
                    },
                    "line_items": line_items,
                    "shipping_lines": [
                      
                    ]
                  }

                let url = Endpoint.ORDER_SUBMIT; 
                Client.postWithLoader(url, inputjsonOrder, true, (response) => {
        
                    console.log(response.data.status);
          
                    if(StringUtils.isNotEmpty(response.data.status)){
                      if(response.data.status == 'processing'){
                        setSuccess(true);

                        cartItems.map((product, index) => {
                        dispatch(removeCartItem(product.id))
                          dispatch(getSubTotal())
                          dispatch(getCartCount())
                          dispatch(calculateTax())
                          dispatch(getTotalAmount())
                        });


                      }else{
                        
          
                      }
                    } 
                  
                  
                  },
                  (error) => {
                      
                  }
                  ); 

                /**/




            },
            prefill: {
                name: data.first_name,
                email: data.email,
                contact: data.phone,
            },
            notes: {
                address: data.address_1,
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        

    }
       

  return (
    <>
     <div className="cod__bradcaump__area" style={{ backgroundImage: `url(${banner_image})`, backgroundRepeat: "no-repeat" ,backgroundSize: "cover" }} >
        <div className="cod__bradcaump__wrap">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="bradcaump__inner">
                            <nav className="bradcaump-inner">
                             <Link className="breadcrumb-item" to="/">Home</Link> 
                            <span className="brd-separetor"><i className="icon icon-arrow-right"></i></span>
                            <span className="breadcrumb-item active">Checkout</span>
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
                <h1>Thank you for your order. It has been placed.</h1>
        </div>  
     :
      
        !isEmptyArray(cartItems) ?            
            <>

<form  onSubmit={handleSubmit(onSubmit)} >
            
            

            <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="first_name">
                        First name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        placeholder="Enter your first name" 
                        className="form-control"
                        {...register("first_name", { required: true, maxLength: 10 })}
                      />
                     
                        {errors.first_name && errors.first_name.type === "required" && (
                        <span className="text-danger" role="alert">This is required</span>
                        )}
                        {errors.first_name && errors.first_name.type === "maxLength" && (
                            <span className="text-danger" role="alert">Max length exceeded</span>
                        )}                
                    </div>
                  </div>
    
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="last_name">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        placeholder="Enter your last name" 
                        className="form-control"
                        {...register("last_name", { required: true, maxLength: 10 })}
                      />
                      {errors.last_name && errors.last_name.type === "required" && (
                        <span className="text-danger" role="alert">This is required</span>
                        )}
                        {errors.last_name && errors.last_name.type === "maxLength" && (
                            <span className="text-danger" role="alert">Max length exceeded</span>
                        )} 
                    </div>
                  </div>
                </div>
    
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="Email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email" 
                        placeholder="Enter your email id" 
                        className="form-control"
                        {...register("email",
                        {
                            required: true,
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                    />
                    {errors.email && errors.email.type === "required" && (
                        <span className="text-danger" role="alert">This is required</span>
                        )}
                        {errors.email && errors.email.type === "pattern" && (
                            <span className="text-danger" role="alert">Email id is not valid.</span>
                        )} 
                    </div>
                  </div>
                  <div className="col">
    
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="phone">
                        Phone
                    </label>
                    <input
                        type="number"
                        id="phone" 
                        placeholder="Enter your Phone number" 
                        className="form-control"
                        {...register("phone", { required: true, maxLength: 10, minLength: 10 })}
                    />
                    {errors.phone && errors.phone.type === "required" && (
                        <span className="text-danger" role="alert">This is required</span>
                        )}
                        {errors.phone && errors.phone.type === "minLength" && (
                            <span className="text-danger" role="alert">Phone number should be atleast 10 digit.</span>
                        )} 
                        {errors.phone && errors.phone.type === "maxLength" && (
                            <span className="text-danger" role="alert">Max length exceeded</span>
                        )} 
                    </div>
    
                  </div>
                </div>
    
    
                <div className="col mb-4">
                <div className="form-outline">
                    <label className="form-label" htmlFor="address_1">
                    Address
                    </label>
                    <input
                    type="text"
                    id="address_1"
                    placeholder="Enter your last name" 
                    className="form-control"
                    {...register("address_1", { required: true, maxLength: 200, minLength: 10 })}
                    />
                    {errors.address_1 && errors.address_1.type === "required" && (
                    <span className="text-danger" role="alert">This is required</span>
                    )}
                    {errors.address_1 && errors.address_1.type === "maxLength" && (
                        <span className="text-danger" role="alert">Max length exceeded</span>
                    )} 
                    {errors.address_1 && errors.address_1.type === "minLength" && (
                        <span className="text-danger" role="alert">Address should be atleast 10 character</span>
                    )}
                </div>
                </div>
               
    
     
                <div className="row mb-4">
    
                    <div className="col">
                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="country">
                            Country
                        </label>
                        <select   className="form-control" {...register("country", { required: true })} defaultValue={'IN'} >
                            <option value="IN" >India</option>
                        </select>
    
                        {errors.country && errors.country.type === "required" && (
                            <span className="text-danger" role="alert">This is required</span>
                            )}
                            
                        </div>
                    </div> 
    
                    <div className="col">
                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="state">
                            State
                        </label>
                        <select   className="form-control" {...register("state", { required: true })} defaultValue={'DL'} >
                              <option value="">Select an option…</option>
                              <option value="DL">Delhi</option>
                              <option value="PB">Punjab</option>
                              <option value="AP">Andhra Pradesh</option>  
                              <option value="GA">Goa</option>
                              <option value="MP">Madhya Pradesh</option>
                              <option value="GJ">Gujarat</option>
                              <option value="HR">Haryana</option>
                              <option value="HP">Himachal Pradesh</option>
                        </select>
    
                        {errors.state && errors.state.type === "required" && (
                            <span className="text-danger" role="alert">This is required</span>
                            )}
                            
                        </div>
                    </div> 
    
                    <div className="col">
                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="city">
                            City
                        </label>
                        <input
                            type="text"
                            id="city" 
                            placeholder="Enter your city" 
                            className="form-control"
                            {...register("city", { required: true, maxLength: 20, minLength: 4 })}
                        />
                        {errors.city && errors.city.type === "required" && (
                            <span className="text-danger" role="alert">This is required</span>
                            )}
                            {errors.city && errors.city.type === "minLength" && (
                                <span className="text-danger" role="alert">City number should be atleast 4 digit.</span>
                            )} 
                            {errors.city && errors.city.type === "maxLength" && (
                                <span className="text-danger" role="alert">Max length exceeded</span>
                            )} 
                            
                        </div>
                    </div> 
    
                    <div className="col">
                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="postcode">
                        Postcode
                        </label>
                        <input
                            type="text"
                            id="postcode" 
                            placeholder="Enter your postcode" 
                            className="form-control"
                            {...register("postcode", { required: true, maxLength: 6, minLength: 4 })}
                        />
                        {errors.postcode && errors.postcode.type === "required" && (
                            <span className="text-danger" role="alert">This is required</span>
                            )}
                            {errors.postcode && errors.postcode.type === "minLength" && (
                                <span className="text-danger" role="alert">Postcode number should be atleast 4 digit.</span>
                            )} 
                            {errors.postcode && errors.postcode.type === "maxLength" && (
                                <span className="text-danger" role="alert">Max length exceeded</span>
                            )} 
                            
                        </div>
                    </div> 
    
    
                </div>
    
    
    
                <div className="row mb-4">
                    <div className="col-sm-8 ">
                    <h2 className='mb-3'>Your order</h2>         
    
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th colSpan={2}  >Product</th>
                            <th className="col-sm-3 col-md-3 ">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                    { 
                cartItems.map((product, index) => {
                    return (<tr key={product.id}> 
    
                        <td className="col-sm-1 col-md-1 "><img className="media-object" style={{width: "90px"}} src={product.image} alt={product.name} /></td>
                        <td  className="col-sm-3 col-md-3 ">{product.name} * {product.quantity}</td>
                        <td className="col-sm-3 col-md-3 ">
                          <strong>
                           INR {parseFloat(product.price * product.quantity).toFixed(
                              2,
                            )}
                          </strong>
                        </td>
    
                    </tr>)                   
    
                    })
    
                }
                
                <tr>
                    <td colSpan={2} className={'text-right'}>Subtotal</td>
                    <td>INR {parseFloat(subAmount).toFixed(2)}</td>
                </tr>
                <tr>
                    <td colSpan={2} className={'text-right'}>Total Amount</td>
                    <td>{parseFloat(totalAmount).toFixed(2)}</td>
                </tr>
    
                </tbody>
                    </table>
    
                    <button type="submit" className="btn btn-primary btn-block mb-4">
                        Place Order
                    </button>
    
                    </div>  
                </div>               
    
    
                 
    
            </form>


        </>
        : 
        <>
        <h2 className="h2 text-center mb-3">Your cart is empty</h2>
        <div className="text-center">
        <Link to="/product" className="btn btn-danger">
            Shop now
        </Link>
        </div>
        </>
        }
          

        </div>
    </div>

    </>
  )
}
export default Checkout;
