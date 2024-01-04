// Extend the HTMLElement class to create the web component
class GreetingMessage extends HTMLElement {
  /**
   * The class constructor object
   */
  constructor () {
    // Always call super first in constructor
    super();

    console.log('Constructed', this);
  }

  /**
   * Runs each time the element is appended or moved in the DOM
   */
  connectedCallback() {
    console.log('Connected!', this);
  }

  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
    console.log('Disconnected', this);
  }
}
if('customElements' in window) {
customElements.define('greeting-message', GreetingMessage)
}
