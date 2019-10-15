import React from "react";
import './Header.css';

class Login extends React.Component {
    render() {
        return (
            <div id="Login">
                <span>Login</span>

                <form>
                    Username: <input type="text" name="username"></input><br/>
                    Password: <input type="text" name="password"></input><br/>
                    <button type="submit" >Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
