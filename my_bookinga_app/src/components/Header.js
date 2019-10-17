import React from "react";
import {NavLink} from "react-router-dom";

import './Header.css';

class Header extends React.Component {
    showLogin() {
        document.getElementById('PopupShadow').style.display='block';
    }

    render() {
        return (
            <header id="MenuHedder">
                    <h1>KID CINEMA!</h1>
                    <NavLink to="/movies" activeClassName="active">Movies</NavLink>
                    <NavLink to="/info" activeClassName="active">Info</NavLink>
                    <span onClick={this.showLogin} >Login</span>
            </header>
        );
    }
}

export default Header;
