// Extend the HTMLElement class to create the web component
class GreetingMessage extends HTMLElement {
  /**
   * The class constructor object
   */
  constructor () {
    // Always call super first in constructor
    super();

    console.log('Constructed', this);

    //Render HTML
    let btnText = this.innerHTML.trim();

    this.innerHTML =
      `<p>
        <button>
          ${this.hasAttribute('wave') ? 'wave' : ''}
          ${btnText ? btnText : 'Hi there!'}
        </button>
      </p>
      <div class="message" aria-live="polite"></div>`;
  }

  /**
   * Handle click events
   * @param {Event} event The event object
   */
  clickHandler(event) {
    // Get the host component
    let host = event.target.closest('greeting-message');

    // Get the message element
    let target = host.querySelector('.message');
    if (!target) return;

    let name = host.getAttribute('name');

    // Inject the message into the UI
    target.textContent = `Hi ${name ? name : 'there, friend'}! Hope you're having a great day.`;

    // Clear the message after 5 seconds
    setTimeout(() => {
      target.textContent = '';
    }, 5000)
  }
  /**
   * Runs each time the element is appended or moved in the DOM
   */
  connectedCallback() {
    console.log('Connected!', this);

    // Attach a click event handler to the button
    let btn = this.querySelector('button');
    if (!btn) return;
    btn.addEventListener('click', this.clickHandler);
  }

  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
    console.log('Disconnected', this);

    // Remove the click event listener from the button
    let btn = this.querySelector('button');
    if (!btn) return;
    btn.removeEventListener('click', this.clickHandler);
  }

  /**
   * Create a list of attributes to observe
   */
  static get observedAttributes() {
    return ['logout'];
  }

  /**
   * Runs when the value of an attribute is changed on the component
   * @param {String} name The attribute name
   * @param {String} oldValue The old attribute value
   * @param {String} newValue The old attribute value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('changed', name, oldValue, newValue, this);

    // If there are multiple attributes being observed,
    // some sort of if/else logic will be necessary...
    if (name === 'logout') {
      // do stuffs
    }

    // Remove the button
    let btn = this.querySelector('button');
    if (btn) {
      btn.removeEventListener('click', this.clickHandler);
      btn.remove();
    }

    // Get the message element
    let target = this.querySelector('.message');
    if (target) {
      // Inject the message into the UI
      let name = this.getAttribute('name');
      target.textContent = `Bye, ${name ? name : 'friend'}! See you next time.`;
    }
  }
}

if('customElements' in window) {
  customElements.define('greeting-message', GreetingMessage)
}

let greeting = document.querySelector('greeting-message');

// Nothing will happen here, because we're not watching this attribute
// greeting.setAttribute('hello', 'you');

// logs 'changed', 'logout', null, 'true
// greeting.setAttribute('logout', true);

// fires 'Constructed => Connected => Disconnected => Connected'
// document.body.append(greeting);

// fires 'Constructed => Connected => Disconnected'
// greeting.remove();
