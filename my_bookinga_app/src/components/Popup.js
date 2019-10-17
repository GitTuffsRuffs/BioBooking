import React from "react";
import Login from './Login'; 
import Bookings from './Bookings';
import './Popup.css';

class Popup extends React.Component {

    close(event) {
        if(event.target.parentNode.id === "PopupShadow") {
            document.getElementById("PopupShadow").style.display = "none";
        }

        if(event.target.id === "LoginClose") {
            document.getElementById("PopupShadow").style.display = "none";
        }
    }

    render() {
        return (
            <div id="PopupShadow" onClick={this.close}>
                <Login onClose={this.close} BioApi={this.props.BioApi} />
                <Bookings />
            </div>
        );
    }
}

export default Popup;
