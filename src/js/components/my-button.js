import {LitElement, css, html} from 'lit';
import { globalStyle } from '../utils/style-loader';
export class MyButton extends LitElement {
  static properties = {
    name: {},
  };
  // Define scoped styles right with your component, in plain CSS
  static get styles() {
    return [
      globalStyle,
      css`
      `
    ];
  }

  constructor() {
    super();
    // Declare reactive properties
    this.name = 'World';
  }

  // Render the UI as a function of component state
  render() {
    return html`
    <button class="btn">
      <slot></slot>
    </button>`;
  }
}
customElements.define('my-button', MyButton);