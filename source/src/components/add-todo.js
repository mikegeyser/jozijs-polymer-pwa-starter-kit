import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { addTodo } from '../actions/add-todo.js';

import { SharedStyles } from './shared-styles.js';

class AddTodo extends connect(store)(LitElement) {
    _render({ }) {
        return html`
            ${SharedStyles}
            <input class="new-todo" 
                   placeholder="What needs to be done?" 
                   autofocus="" 
                   on-keyup="${this._addTodo}">
        `;
    }

    _addTodo(e) {
        if (e.key !== "Enter")
            return;

        const input = e.target;

        store.dispatch(addTodo(input.value));
        input.value = "";
    }

    _stateChanged(state) { }
}

window.customElements.define('add-todo', AddTodo);
