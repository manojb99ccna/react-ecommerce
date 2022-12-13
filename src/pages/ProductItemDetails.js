import React, { useEffect, useState } from 'react';
import { isEmptyArray } from '../utility/Utility';


function ProductItemDetails(props) {
  
    const [MainImage, setMainImage] = useState(""); 

    let data = props.data; 
    let product_image = '';
   product_image = !isEmptyArray(data.images) ? data.images[0].src : '';

   setMainImage(product_image);  


   function updateMainImage(e){  
    setMainImage(e.target.src); 
   } 

    return (
    <>
    <div className="row">   

    <div className="col-md-6 border-end">
                <div className="d-flex flex-column justify-content-center">
                    <div className="main_image">
                        <img src={MainImage}  id="main_product_image" width="350" />
                    </div>
                    <div className="thumbnail_images">
                        <ul id="thumbnail">  
                            <li key='0'><img  onClick={updateMainImage}  src={MainImage} width="70" /></li>  
                            {
                                data.images.map(item =>    
                                 <li key={item.id}><img onClick={updateMainImage}  src={item.src}  width="70" /></li>  
                                )
                            }   
                        </ul>
                    </div>
                </div>
            </div>

    </div>
    </>
  )
}
export default ProductItemDetails;