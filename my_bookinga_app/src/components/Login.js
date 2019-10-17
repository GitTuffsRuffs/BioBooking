import React from "react";
import './Login.css';

class Login extends React.Component {

    render() {
        return (
            <form>
                <div id="Login">
                    <p>Login</p>
                    <label>
                        <span>Username:</span> 
                        <input type="text" name="username"/>
                    </label>
                    <label>
                        <span>Password:</span>
                        <input type="password" name="password"/>
                    </label>
                    <label>
                        <input type="submit" value="Login" />
                    </label>
                    <span id="LoginClose" onClick={this.props.onClose}>X</span>
                </div>
            </form>
        );
    }
}

export default Login;
