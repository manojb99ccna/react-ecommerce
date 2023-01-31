import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; 
import { removeLoginUser } from "../../features/useUserSlice"; 

export default function LeftSidebar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogOut = () => {
        
        dispatch(removeLoginUser());  
        navigate('/login');
      }


  return (
    <>
    <div className="list-group">
            <Link to="/dashboard" className="list-group-item">Dashboard</Link> 
            <Link to="#" className="list-group-item">Change Password</Link> 
            <Link to="/order" className="list-group-item">Order History</Link>
            <Link to="/payment" className="list-group-item">Transactions</Link> 
            <Link onClick={onLogOut} className="list-group-item">Logout</Link>
     </div>
    </>
  )
}
