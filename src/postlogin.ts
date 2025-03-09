import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"

@customElement("postlogin")
export class Postlogin extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html``;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "postlogin": Postlogin;
    }
}

