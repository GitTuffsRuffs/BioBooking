import React from "react";
import {Link} from "react-router-dom";

import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <header id="MenuHedder">
                <div>
                    <h1>KID CINEMA!</h1>
                    <Link to="/movies">Movies</Link><span> | </span>
                    <Link to="/info">Info</Link><span> | </span>
                    <Link to="/login">Login</Link>
                </div>
            </header>
        );
    }
}

export default Header;
