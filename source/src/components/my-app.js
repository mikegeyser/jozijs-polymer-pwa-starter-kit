import {LitElement, html} from '@polymer/lit-element';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {store} from '../store.js';

import {SharedStyles} from './shared-styles.js';
import './add-todo.js';
import './todo-list.js';
import {todos, todoSelector} from '../reducers/todos.js';

store.addReducers({
    todos
});

class MyApp extends connect(store)(LitElement) {
    _render({_todos}) {
        return html`
            ${SharedStyles}
            
            <section class="todoapp">
              <header class="header">
                <h1>todos</h1>
                <add-todo></add-todo>
              </header>
        
              <section class="main">
                <todo-list></todo-list>
              </section>
            </section>
    `;
    }

    static get properties() {
        return {
            _todos: Array
        }
    }

    _stateChanged(state) {
        this._todos = todoSelector(state);
    }
}

window.customElements.define('my-app', MyApp);
