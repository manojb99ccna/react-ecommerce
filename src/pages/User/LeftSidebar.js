import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { removeLoginUser } from "../../features/useUserSlice"; 
import { isEmptyArray } from "../../utility/Utility";

export default function LeftSidebar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();


    const { UserLoginData, LoginId } = useSelector((state) => state.user);

    useEffect(() => { 
      if(isEmptyArray(UserLoginData)){
        navigate('/login');
      }
    });


    const onLogOut = () => { 
        dispatch(removeLoginUser());  
        navigate('/login');
      }


  return (
    <>
    <div className="list-group">
            <Link to="/dashboard" className={(location.pathname=='/dashboard') ? 'list-group-item active' : 'list-group-item'} >Dashboard</Link> 
            <Link to="/order" className={(location.pathname=='/order' || location.pathname.includes('order') ) ? 'list-group-item active' : 'list-group-item'}>Order History</Link> 
            <Link onClick={onLogOut} className="list-group-item">Logout</Link>
     </div>
    </>
  )
}
