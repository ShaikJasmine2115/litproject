import { LitElement , html, css} from "lit";
import { customElement } from "lit/decorators.js";
import "./head-foot.js"
import "./login.js"

@customElement('project-element')
export default class Project extends LitElement{
render(){

  return html`
  
  <log-in></log-in>
  `
}
}