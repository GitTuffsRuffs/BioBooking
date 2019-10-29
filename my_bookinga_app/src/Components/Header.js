import React from "react";
import {NavLink} from "react-router-dom";
import Login from './Login';
import PopupPortal from './PopupPortal';
import './Header.scss';

class Header extends React.Component {
    constructor() {
        super(); 
        this.state = { logedin: false }
        this.showLogin = this.showLogin.bind(this);
        this.logout = this.logout.bind(this);
        this.loginUppdate = this.loginUppdate.bind(this);
    }

    componentDidMount() {
        this.props.BioApi.addListener(this.loginUppdate);

        if(this.props.BioApi.islogedin()) {
            this.setState({ logedin: true });
        }
    }

    showLogin() {
        document.getElementById('loginForm').style.display='flex';
        document.getElementById('PopupShadow').style.display='block';
    }

    logout() {
        this.props.BioApi.logout();
    }

    loginUppdate(logedin){
        this.setState({logedin});
    }

    render() {
        return (
            <header id="MenuHedder">
                    <h1>KID CINEMA!</h1>
                    <NavLink to="/movies" activeClassName="active">Movies</NavLink>
                    <NavLink to="/info" activeClassName="active">Info</NavLink>

                    { this.state.logedin ?
                         (<>
                            <NavLink to="/mybookings" activeClassName="active">My Bookings</NavLink>
                            <span onClick={this.logout}>Logout</span>
                         </>)
                         :
                         (<>
                            <span onClick={this.showLogin}>Login</span>
                            <PopupPortal>
                                <Login BioApi={this.props.BioApi} />
                            </PopupPortal>
                         </>)
                    }
            </header>
        );
    }
}

export default Header;
