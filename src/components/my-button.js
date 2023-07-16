import {LitElement, css, html} from 'lit';

export class MyButton extends LitElement {
  static properties = {
    name: {},
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      color: blue;
    }
  `;

  constructor() {
    super();
    // Declare reactive properties
    this.name = 'World';
  }

  // Render the UI as a function of component state
  render() {
    return html`
    <button>
      <slot></slot>
    </button>`;
  }
}
customElements.define('my-button', MyButton);