import ReactDOM from 'react-dom';
import React from "react";

class PopupPortal extends React.Component {
    popupShadow = null;

    constructor() {
        super();
        this.state = {popupShadow: this.popupShadow};
    }

    componentDidMount() {
        if(this.popupShadow == null) {
            this.popupShadow = document.getElementById('PopupShadow');
            if(this.popupShadow != null) {
                this.setState({popupShadow: this.popupShadow});
            }
        }
    }

    render() {
        if(this.popupShadow == null) {
            this.popupShadow = document.getElementById('PopupShadow');
            if(this.popupShadow == null) {
                return "";
            }
        }

        return ReactDOM.createPortal(
            this.props.children,
            this.popupShadow
        );
    }
}

export default PopupPortal;