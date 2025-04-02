import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './head-foot.js';

import './body-component.js';

@customElement('dashboard-page')
export class DashboardPage extends LitElement {
    render() {
        return html`
            <head-foot></head-foot>
            <body-component></body-component>
            
        `;
    }
}
