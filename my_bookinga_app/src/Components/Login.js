import React from "react";
import './Login.scss';

class Login extends React.Component {

    constructor() {
        super();
        this.close = this.close.bind(this);
        this.maybeClose = this.maybeClose.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
    }

    close() {
        //TODO: FIX better
        try{
            document.getElementById('PopupShadow').click();
            document.getElementById('loginForm').style.display = 'none';
        } catch {}
    }

    maybeClose(event) {
        if(event.target.tagName === "FORM") {
           this.close();
        } else {
            event.preventDefault();
        }
    }

    async submitLogin(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        document.getElementById("password").value = "";

        if(await this.props.BioApi.login(username, password))
        {
            this.close();
        } else {
            alert("Login faild");
        }
    }

    async submitRegister(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        document.getElementById("password").value = "";

        if(await this.props.BioApi.register(username, password))
        {
            this.props.onClose(event);
        } else {
            alert("Register faild");
        }
    }

    render() {
        return (
            <form id="loginForm" method="post" onClick={this.maybeClose}>
                <div id="Login">
                    <p>Login</p>
                    <label>
                        <span>Username:</span> 
                        <input id="username" type="text" name="username"/>
                    </label>
                    <label>
                        <span>Password:</span>
                        <input id="password" type="password" name="password"/>
                    </label>
                    <label>
                        <input type="submit" value="Register" onClick={this.submitRegister} />
                        <input type="submit" value="Login" onClick={this.submitLogin} />
                    </label>
                    <span id="LoginClose" onClick={this.close}>X</span>
                </div>
            </form>
        );
    }
}

export default Login;
