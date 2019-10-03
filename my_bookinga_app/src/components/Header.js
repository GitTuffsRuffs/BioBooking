import React from "react";
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <header id="MenuHedder">
                <div>
                    <br/>
                    <span>KID BIO</span>
                    <br/>
                    <span>Home</span><span> | </span>
                    <span>Movies</span><span> | </span>
                    <span>Info</span><span> | </span>
                    <span>Login</span>
                </div>
            </header>
        );
    }
}

export default Header;
