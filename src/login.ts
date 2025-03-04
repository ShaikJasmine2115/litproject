import { LitElement, html,  css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('log-in')
export default class Login extends LitElement{
    
    static styles= css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        
    }
    body {
    
        background-color: #f0f0f0;
        display: flex;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
       
    }

    #heading {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 30px;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 400px;
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .form-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease-in-out;
    }
    .form {
        display: block;
        padding: 20px;
        
    }
    .form.active {
        display: block;
    }
    #login-link{
        color: #8a1741;
    }
    #login-link:hover{
        color:#d34e93;
        cursor: pointer;
    }
    button {
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        background-color: #8a1741;
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #d34e93;
    }
    #loginbtn, #registerbtn, .form-container h2{
        display: flex;
        justify-content: center; 
        align-items: center;   
    }
    input {
        width: 100%;
        padding: 10px;
        margin: 5px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    #error-message {
        color:maroon; font-size: 14px; text-align: center;
        }

    `
    render(){
        return html`
        <body>
            <div id="heading">
              <h2>WELCOME TO USER MANAGEMENT SYSTEM</h2>
            </div>
            <div class="container">
            <div class="form-container">        
                <form id="login-form" class="form">
                    <h2>Validate your credentials</h2> <br>
                    <input type="text" id="login-username" placeholder="Username" required>
                    <input type="password" id="login-password" placeholder="Password" required>
                    <div id="loginbtn"><button id="login" type="submit">Login</button></div>
                </form>
                <form id="register-form" class="form" >
                    <h2>Register</h2> <br>
                    <input type="text" id="register-userfirstname" placeholder="First name" maxlength="15" minlength="2" required>
                    <input type="text" id="register-userlastname" placeholder="Last name" maxlength="15" minlength="2" required>
                    <input type="email" id="register-email" placeholder="Email" required>
                    <input type="password" id="register-password" placeholder="Password" maxlength="20" minlength="8" required >
                    <div id="registerbtn"><button id="register" type="submit">Register</button></div>
                </form>
              <div id="error-message"></div>
                <button id="register-toggle">New user? Sign up here!</button>
                <span onclick="loginlink()" id="login-link" style="display: none;">Back to login</span>  <br>        
            </div>
            </div>`
    }
}
