import React from "react";
import StringUtils from "../utility/StringUtils";
import { isEmptyArray } from "../utility/Utility";

class ProductItemDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductDetails: props.data,
      MainImage: null,
    };

    this.updateMainImage = this.updateMainImage.bind(this);
  }

  componentDidMount() {
    this.setState({
      MainImage: !isEmptyArray(this.state.ProductDetails.images)
        ? this.state.ProductDetails.images[0].src
        : "",
    });
  }

   
  updateMainImage = (e) => { 
    this.setState({ MainImage: (e.target.src) ? e.target.src : null  });

  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-6 border-end">
            <div className="d-flex flex-column justify-content-center">
              <div className="main_image">
                <img
                  src={this.state.MainImage}
                  id="main_product_image"
                  width="350"
                />
              </div>
              <div className="thumbnail_images">
                <ul id="thumbnail">
                  
                  {this.state.ProductDetails.images.map((item) => (
                    <li key={item.id}>
                      <img onClick={this.updateMainImage} src={item.src} width="70" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6">
                <div className="p-3 right-side">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>{this.state.ProductDetails.name}</h2> <span className="heart"><i className='fa fa-heart'></i></span>
                    </div>
                    <div className="mt-2 pr-3 content">
                        <p>{StringUtils.removeHtmlTags(this.state.ProductDetails.description)}</p>
                    </div>

                    <h2> INR {this.state.ProductDetails.price}</h2>
                     
                 
                    <div className="buttons d-flex flex-row mt-5 gap-3">  
                    <button className="btn btn-outline-dark btn-lg ">Add to Wishlist</button> 
                    <button className="btn btn-dark btn-lg">Add to Cart</button>  
                    </div>
 
                </div>
            </div>

        </div>
      </>
    );
  }
}
export default ProductItemDetails;
