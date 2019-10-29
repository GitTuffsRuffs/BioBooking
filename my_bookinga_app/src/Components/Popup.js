import React from "react";
import './Popup.scss';

class Popup extends React.Component {

    close(){
        document.getElementById("PopupShadow").style.display = "none";
    }

    render() {
        return (
            <div id="PopupShadow" onClick={this.close} />
        );
    }
}

export default Popup;
