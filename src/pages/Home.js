import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav, Container } from "react-bootstrap";

function Home() { 
  

  

  return (
    <>


      <Container className="main-container min-height-1 mt-5 ">
        <h1 className="d-flex justify-content-center mt-3">
          <span className="text text-center">Find your best product</span>
        </h1>

        <div className="row mt-2 g-4"  > 
            
            <p className="mtb--20">
              <strong>Lorem Ipsum</strong> is simply dummy text of the printing
              and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make a type specimen
              book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>

            <Link className="btn btn-primary" to="product">
                      View Product
             </Link>
           

        </div>

 
      </Container>
    </>
  );
}
export default Home;