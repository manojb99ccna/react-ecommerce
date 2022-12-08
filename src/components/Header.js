import logo from './../assets/images/logo/logo.png';
import React, { Component } from 'react';


export default function Header() {


  return (
    <>
        <header id="cod__header" className="cod__header__area header--one">
        
        <div id="sticky-header-with-topbar" className="mainmenu__wrap sticky__header">
            <div className="container">
                <div className="row">
                    <div className="menumenu__container clearfix">
                        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-5"> 
                            <div className="logo">
                                <a href="">
                                    <img alt="avatar" src={logo} className={''} />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-7 col-lg-8 col-sm-5 col-xs-3">
                            <nav className="main__menu__nav hidden-xs hidden-sm">
                                <ul className="main__menu">
                                    <li className=""><a href="/">Home</a></li>
                                    <li><a href="/">About</a></li> 
                                    <li><a href="/">Products</a></li> 
                                    <li><a href="/">contact</a></li>
                                </ul>
                            </nav>

                            
                            <div className="mobile-menu clearfix visible-xs visible-sm">
                                <nav id="mobile_dropdown">
                                    <ul>
                                        <li className=""><a href="">Home</a></li>
                                        <li><a href="/">About</a></li>
                                        <li><a href="/">Products</a></li>   
                                        <li><a href="/">contact</a></li>
                                    </ul>
                                </nav>
                            </div>  
                        </div>
                        <div className="col-md-3 col-lg-2 col-sm-4 col-xs-4">
                            <div className="header__right"> 
                                <div className="header__account">
                                    <a href="#" data-toggle="modal" data-target="#loginModal" ><i className="icon-user icons"></i></a>
                                </div>
                                <div className="cod__shopping__cart">
                                    <a className="cart__menu" href="#"><i className="icon-handbag icons"></i></a>
                                    <a className="cart__menu" href="#"><span className="cod__qua">2</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mobile-menu-area"></div>
            </div>
        </div>
        
    </header>
    </>
  )
}
