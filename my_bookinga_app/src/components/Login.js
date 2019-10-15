import React from "react";
import './Login.css';

class Login extends React.Component {

    close(event) {
        if(event.target.parentNode.id === "LoginShadow") {
            document.getElementById("LoginShadow").style.display = "none";
        }

        if(event.target.id === "LoginClose") {
            document.getElementById("LoginShadow").style.display = "none";
        }
    }

    render() {
        return (
            <div id="LoginShadow" onClick={this.close}>
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
                        <span id="LoginClose" onClick={this.close}>X</span>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
