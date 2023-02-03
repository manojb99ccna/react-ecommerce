import React from 'react'
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
      <>

      <li className=""> <Link className="" to="/">Home</Link> </li>
      <li className=""> <Link className="" to="/product">Product</Link>   </li>
      <li className=""> <Link className="" to="/about">About</Link>   </li>
      <li><Link className="" to="/contact">Contact</Link> </li>


    </>
  )
}
