import { LitElement, html,  css, PropertyValues } from "lit";
import { customElement,property,state,query } from "lit/decorators.js";
import { Router } from '@lit-labs/router';
import { UnsafeMathDirective } from "lit/directives/unsafe-mathml.js";

@customElement('log-in')
export default class Login extends LitElement{
    @state() private formData: Record<string, string> = {};
    @query('#login-form') logform!: HTMLFormElement;
    @query('#error-message') errorMessage!: HTMLDivElement ;
    @query('#login') loginBtn!: HTMLButtonElement;
    // activeForm: string ;
    username: string = '' ;
    password: string = '' ;
    email: string = '' ;

    // constructor(){
    //     super()
    //     this.activeForm ='loginForm';       
    // }  
    // protected firstUpdated(_changedProperties: PropertyValues): void {}
   render(){
        return html`
        ${this.renderLoginForm()}
              `
    }

    renderLoginForm(){
        return html`
            <div class="form-container">        
                <form id="login-form" class="form" @submit=${this.logSubmit}>
                    <h2 id="inbox">Validate your credentials</h2> <br>
                    <input type="text" id="login-username"  placeholder="Username" @change="${this.handleInput}" required>
                    <input type="password" id="login-password" placeholder="Password" @change="${this.handleInput}"required>
                    <div id="loginbtn"><button id="login" type="submit">Login</button></div>
                </form>
                <div id="error-message"></div>
                <button @click=${this.regToggle} id="register-toggle">New user? Sign up here!</button>
            </div>
        `
    }

    regToggle(){
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent('navigate', {
            detail: '/register',
            bubbles: true,
            composed: true
        }));

    }


   
    handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.formData = { ...this.formData, [target.id]: target.value };  
        // console.log(this.formData);  
    }

    logSubmit(event: Event) {
        event.preventDefault(); // Prevent form refresh
        // console.log(this.formData);
        const { "login-username": username, "login-password": password } = this.formData; 
        // console.log(username,password);
        this.authenticateUser(username,password);
    }

    authenticateUser(username : string,password : string){      
        fetch('https://dummyjson.com/users')
            .then(Response => Response.json())
            .then(data=>{
                const user= data.users.find((user:any) => user.username===username && user.password===password);
                if(user){
                    sessionStorage.setItem("loggedIn","true");
                    sessionStorage.setItem("userName", username);
                    sessionStorage.setItem("userData", JSON.stringify(user));
                    console.log("loggedin");
                    // window.location.href= "postlogin.html";
                    this.dispatchEvent(new CustomEvent('navigate', {
                        detail: '/dashboard',
                        bubbles: true,
                        composed: true
                    }));
                    
                }else{
                   this.errorMessage.textContent="Incorrect username or password";
                   this.loginBtn.textContent='Try again';
                //    this.regTog.style.display='none';
                   this.loginBtn.onclick = () => {
                        this.resetloginForm(); 
                        this.loginBtn.onclick = null;
                      };
                //    this.loginBtn.addEventListener('click', () => {
                //         this.resetloginForm();
                //     }, { once: true });              
                }
            })
            .catch(error => console.error("Error:", error));
    }
    resetloginForm(){
        this.logform.reset();
        this.loginBtn.textContent='Login';      
        this.errorMessage.textContent='';     
        // this.regTog.style.display='block';
    }
   
    static styles= css`
     * {
        box-sizing: border-box;        
    }
    /* body {
        background-color:#d8d3d3;
        display: flex;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    } */
    /*#wrapper {
        display: flex;
        flex-direction: column;  Stack heading and container 
        align-items: center;
        gap: 20px; Adds space between heading and container  
        flex-grow: 1; Helps maintain centering 
        justify-content: center;  
    } 
    #heading {
        margin-top: 30px;
        text-align: center;
        
    }*/
    #inbox{
        color:#534949;
        padding: 10px, 10px;
    }
    /* .container {           
        text-align: center;
        width: 100%;
        max-width: 400px;       
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    } */
    .form-container {
        padding: 20px;
        border-radius: 50px;
        width:400px;
        background-color: rgb(197 191 193);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease-in-out;
    }
    .form {       
        padding: 20px;       
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
        background-color:rgb(75, 73, 73);
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
    #loginbtn, #registerbtn{
        padding-top: 15px;
    }
    input {
        width: 100%;
        padding: 10px;
        margin: 5px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    #error-message {
        color:maroon;
        font-size: 14px; 
        text-align: center;
        padding-bottom:10px;
        }

    `  
}