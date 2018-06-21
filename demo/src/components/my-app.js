import {LitElement, html} from '@polymer/lit-element';

import {SharedStyles} from './shared-styles.js';

class MyApp extends LitElement {
    _render() {
        return html`
            ${SharedStyles}
            
            <section class="todoapp">
              <header class="header">
                <h1>todos</h1>
              </header>
        
              <section class="main">
              </section>
            </section>
    `;
    }
}

window.customElements.define('my-app', MyApp);
