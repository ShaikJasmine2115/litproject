import { LitElement, html,  css, PropertyValues } from "lit";
import { customElement,property,state,query } from "lit/decorators.js";
import { Router } from '@lit-labs/router';
import { UnsafeMathDirective } from "lit/directives/unsafe-mathml.js";

@customElement('register-page')
export default class RegisterPage extends LitElement{
    @state() private formData: Record<string, string> = {};
    @query('#register-form') regform!: HTMLFormElement;
    @query('#error-message') errorMessage!: HTMLDivElement ;
    @query('#register') registerBtn!: HTMLButtonElement;
    @query('#register-toggle') regTog!: HTMLButtonElement;
    activeForm: string='' ;
    userfirstname: string = '' ;
    userlastname: string = '' ;
    email: string = '' ;
    password: string = '' ;
    render(){
        console.log("RegisterPage rendering..."); // Debugging log
        return html`${this.renderRegForm()}`
    }
    updated() {
        console.log('RegisterPage updated!');
      }
    renderRegForm(){
        return html`
        <div class="form-container"> 
            <form id="register-form" class="form" @submit=${this.regSubmit} >
                <h2>Register</h2> <br>
                <input type="text" id="register-userfirstname" placeholder="First name" @change="${this.handleInput}" maxlength="15" minlength="2" required>                
                <input type="text" id="register-userlastname" placeholder="Last name" @change="${this.handleInput}" maxlength="15" minlength="2" required>
                <input type="email" id="register-email" placeholder="Email" @change="${this.handleInput}" required>
                <input type="password" id="register-password" placeholder="Password" @change="${this.handleInput}" maxlength="20" minlength="8" required >
                <div id="registerbtn"><button id="register" type="submit">Register</button></div>
            </form>
            <div id="error-message"></div>
            <span @click=${this.logToggle} id="login-link" >Back to login</span>  <br>        
        </div>
        `
    }   
    logToggle(){
        this.dispatchEvent(new CustomEvent('navigate', {
            detail: '/',
            bubbles: true,
            composed: true
        }));
    }
   
    handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.formData = { ...this.formData, [target.id]: target.value };  
        // console.log(this.formData);  
    }
    regSubmit(event: Event){
        event.preventDefault();
        const {"register-userfirstname": userfirstname,"register-userlastname":  userlastname, "register-email": email,"register-password":  password } = this.formData; 
        this.registerUser(userfirstname,userlastname,email,password);
    }

    registerUser(userfirstname:string,userlastname:string, email: string, password: string){
        console.log(userfirstname,userlastname,email,password);
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!emailPattern.test(email)) {           
            this.errorMessage.textContent = 'Please enter a valid email address.';
            this.registerBtn.textContent='Try again';
            this.registerBtn.onclick = () => {
                // this.resetloginForm(); 
                this.registerBtn.onclick = null;
              };
            
        } 
        else{
            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("userfirstname", userfirstname);
            sessionStorage.setItem("userlastname", userlastname);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("password", password); 
            this.dispatchEvent(new CustomEvent('navigate',{
                detail:'/dashboard',
                bubbles: true,
                composed: true
            }));       
        }
    }
    resetregForm(){
        this.email='';
        this.registerBtn.style.display='block';
        this.regform.reset();
        this.errorMessage.textContent='';    
    }
    static styles= css`
    * {
       box-sizing: border-box;        
     }
     #inbox{
        color:#534949;
        padding: 10px, 10px;
    }
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