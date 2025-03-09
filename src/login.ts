import { LitElement, html,  css, PropertyValues } from "lit";
import { customElement,property,state } from "lit/decorators.js";

@customElement('log-in')
export default class Login extends LitElement{
   
    protected firstUpdated(_changedProperties: PropertyValues): void {
        this.shadowRoot?.getElementById('login-form')?.classList.add('active') ;
        this.shadowRoot?.getElementById('register-form')?.classList.remove('active');

    }

    regToggle(){
        this.shadowRoot?.querySelector('#register-form')?.classList.add('active');
        this.shadowRoot?.querySelector('#login-form')?.classList.remove('active');
        const button1=this.shadowRoot?.querySelector('#register-toggle')as HTMLButtonElement ;
        if (button1){
            button1.style.display='none';
        }
        const loginLink=this.shadowRoot?.querySelector('#login-link')as HTMLSpanElement;
        if(loginLink){
            loginLink.style.display='block';
        }
    }

    logToggle(){
        this.shadowRoot?.getElementById('login-form')?.classList.add('active');
        this.shadowRoot?.getElementById('register-form')?.classList.remove('active');
        const button1=this.shadowRoot?.getElementById('register-toggle');
        if (button1){
            button1.style.display='block';
        }
        const loginLink=this.shadowRoot?.getElementById('login-link');
        if(loginLink){
            loginLink.style.display='none';
        }
    }

    logSubmit(event:Event){
        event.preventDefault();
        const usname= this.shadowRoot?.querySelector('#login-username')as HTMLInputElement;
        const username=usname.value;
        const pword= this.shadowRoot?.querySelector('#login-password') as HTMLInputElement;
        const password=pword.value;
        this.authenticateUser(username,password);
        
    }

    regSubmit(event: Event){
        event.preventDefault();
        const usfname= this.shadowRoot?.querySelector('#register-userfirstname') as HTMLInputElement;
        const userfirstname= usfname.value;
        const uslname= this.shadowRoot?.querySelector('#register-userlastname') as HTMLInputElement;
        const userlastname=uslname.value;
        const em=this.shadowRoot?.querySelector('#register-email') as HTMLInputElement;
        const email=em.value;
        const pd=this.shadowRoot?.querySelector('#register-password') as HTMLInputElement;
        const password=pd.value;
        this.registerUser(userfirstname,userlastname,email,password);
    }

    authenticateUser(username : string,password : string){
        const errorMessage= this.shadowRoot?.querySelector('#error-message');
        fetch('https://dummyjson.com/users')
            .then(Response => Response.json())
            .then(data=>{
                const user= data.users.find((user:any) => user.username===username && user.password===password);
                if(user){
                    sessionStorage.setItem("loggedIn","true");
                    sessionStorage.setItem("userName", username);
                    sessionStorage.setItem("userData", JSON.stringify(user));
                    
                    window.location.href= "postlogin.html";
                }else{
                    const log=this.shadowRoot?.querySelector('#login') as HTMLButtonElement;
                    log.style.display='none';
                 
                }
            })
            .catch(error => console.error("Error:", error));
    }

    registerUser(userfirstname:string,userlastname:string, email: string, password: string){
        const errorMessage= this.shadowRoot?.querySelector('#error-message');


    }

    resetloginForm(){
        const log=this.shadowRoot?.querySelector('#login') as HTMLButtonElement;
            log.style.display='block';
        const lefor= this.shadowRoot?.querySelector('#login-form') as HTMLFormElement;
            lefor.reset();
        const errm= this.shadowRoot?.querySelector('#error-message') as HTMLDivElement;
            errm.innerHTML='';
    }

    resetregForm(){
        const reg= this.shadowRoot?.querySelector('#register') as HTMLButtonElement;
            reg.style.display='block';       
        const refor=this.shadowRoot?.querySelector('#register-form')as HTMLFormElement;
            refor.reset();       
        const errm= this.shadowRoot?.querySelector('#error-message') as HTMLDivElement;
            errm.innerHTML='';
    }
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
        position: absolute;
        width: 100%;
        max-width: 400px;
        margin-top: 70px;
        margin-bottom: 60px;    
        left: 50%;
        transform: translateX(-50%);
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
        display: none;
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
    span{
        user-select : none;
    }
    button {
        user-select: none;
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
                <form id="login-form" class="form" @submit=${this.logSubmit}>
                    <h2>Validate your credentials</h2> <br>
                    <input type="text" id="login-username" placeholder="Username" required>
                    <input type="password" id="login-password" placeholder="Password" required>
                    <div id="loginbtn"><button id="login" type="submit">Login</button></div>
                </form>
                <form id="register-form" class="form" @submit=${this.regSubmit} >
                    <h2>Register</h2> <br>
                    <input type="text" id="register-userfirstname" placeholder="First name" maxlength="15" minlength="2" required>
                    <input type="text" id="register-userlastname" placeholder="Last name" maxlength="15" minlength="2" required>
                    <input type="email" id="register-email" placeholder="Email" required>
                    <input type="password" id="register-password" placeholder="Password" maxlength="20" minlength="8" required >
                    <div id="registerbtn"><button id="register" type="submit">Register</button></div>
                </form>
              <div id="error-message"></div>
                <button @click=${this.regToggle} id="register-toggle">New user? Sign up here!</button>
                <span @click=${this.logToggle} id="login-link" style="display: none;">Back to login</span>  <br>        
            </div>
            </div>`
    }
}
