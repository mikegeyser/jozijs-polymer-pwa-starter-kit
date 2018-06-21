import { LitElement, html } from "@polymer/lit-element/lit-element";
import { store } from '../store';
import { todoSelector } from '../reducers/todos';
import { connect } from "pwa-helpers/connect-mixin";
import { SharedStyles } from "./shared-styles";

import './view-todo';
import './edit-todo';

class TodoList extends connect(store)(LitElement) {
    static get properties() {
        return {
            todos: Array
        };
    }

    _render({ todos }) {
        const cssClass = (todo) => [
            todo.completed && "completed",
            todo.editing && "editing"]
            .join(" ");

        return html`
             ${SharedStyles}
            
            <ul class="todo-list">
                ${todos.map(todo => html`
                <li class$="${cssClass(todo)}">
                    <view-todo todo="${todo}"></view-todo>
                    <edit-todo todo="${todo}"></edit-todo>
                </li>
                `)}
            </ul>
        `;
    }

    _stateChanged(state) {
        this.todos = todoSelector(state);
    }
}

window.customElements.define('todo-list', TodoList);