import React from "react";
import Emitter from "../Events/Emitter";
import EventName from "../Events/EventName";

class AlertMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: false,
      message:'',
    };
  }

  componentDidMount() {

    Emitter.on(EventName.ALERT_MESSAGE.SUCCESS, (object) => {        

        this.setState({ successMessage: true, message: (object.message) ? object.message : '' }); 
        this.hideMessage(3000);
    });

  }

  hideMessage(timeout){  
    setTimeout(() => {
        this.setState({ successMessage: false }); 
      }, timeout);    
  }

  render() {
    if (this.state.successMessage) {
      return (
        <>
          <div
            id="alert"
            className="position-fixed top-0 end-0 p-3"            
            style={{zIndex: 9999 }}
          >
            <div className="alert alert-success alert-dismissible">
              <i className="fa fa-exclamation-circle"></i>

               &nbsp; {this.state.message}

              <button
                type="button"
                className="btn-close" 
                onClick={()=> {  this.setState({ successMessage: false });  }}
              ></button>
            </div>
          </div>
        </>
      );
    }
  }
}
export default AlertMessage;
