import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@lit-labs/router';
import './login.js';
import './dashboard-page.js';
import "./register.js";


@customElement('app-root')
export class AppRoot extends LitElement {
    private router: Router;  // Declare router as a class property

    constructor() {
        super();
        
        // Initialize router before using it
        this.router = new Router(this, [
            { path: '/', render: () => html`<log-in></log-in>` },
            { path: '/register', render: () => html `<register-page><register-page>`},
            { path: '/dashboard', render: () => html`<dashboard-page></dashboard-page>` }
        ]);

        // Listen for 'navigate' events and update the router
        window.addEventListener('navigate', (event: Event) => {
            const path = (event as CustomEvent).detail;
            this.router.goto(path);
            this.requestUpdate();
        });
    }

    render() {
        return this.router.outlet();
    }
}