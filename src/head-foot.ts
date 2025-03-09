import { LitElement,html,css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('head-foot')
export default class HeaderFooter extends LitElement{
    static styles =css`
    header {
        position: fixed;
        top:0;      
        background-color: #840533;
        color: white;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100px;
        z-index: 1000; 
        box-sizing: border-box;
        box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.2);
    }
    header h1 {
      
        padding:15px;
        font-size: 30px;
    }
    footer {  
        position: fixed;
        background-color: #9b6c7d;    
        text-align: center;    
        padding: 10px;    
        font-size: 0.9em;    
        color: white;   
        bottom: 0;    
        width: 100%;    
        z-index: 1000;    
        box-sizing: border-box;
        box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.2);
    }   
    `
    render(){
        return html`
        <body>
        <header>
          <h1>USER MANAGEMENT SYSTEM</h1>     
        </header>
        <footer>
            &copy; 2024 Annalect. All Rights Reserved.
        </footer>
        
        
        `
    }
}