import React, { useEffect } from 'react'; 

import CheckoutInner from './CheckoutInner';
import banner_image from './../assets/images/backgound.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { isEmptyArray } from '../utility/Utility';
import { useDispatch, useSelector } from 'react-redux';

 function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { UserLoginData, LoginId } = useSelector((state) => state.user);

  useEffect(() => {
    if(isEmptyArray(UserLoginData)){
      navigate('/checkout/login');
    }
  });

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

    {(isEmptyArray(UserLoginData)) ?

      <>
      <div className='mt-5 mb-5 pt-5 pb-5'>
      <h1 className='text-center'>Please login for place your order. <Link to="/login" className='text-success'>Click here to login</Link></h1>
      </div>
      
      </>

      :

     <CheckoutInner />

    }
    </>
  )
}
export default Checkout;
