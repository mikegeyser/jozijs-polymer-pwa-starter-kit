import {LitElement, html} from '@polymer/lit-element';
import {store} from '../store.js';
import {connect} from "pwa-helpers/connect-mixin";
import {SharedStyles} from "./shared-styles";
import {completeEditing} from "../actions/complete-editing";
import {cancelEditing} from "../actions/cancel-editing";

class EditTodo extends connect(store)(LitElement) {
    static get properties() {
        return {
            todo: Object
        }
    }

    _render({todo}) {
        if (!todo || !todo.editing)
            return html``;

        return html`
            ${SharedStyles}
            
            <input class="edit"  
              value$="${todo.title}"                
              on-blur="${(e) => this._onBlur(e, todo)}"
              on-keyup="${(e) => this._onKeyup(e, todo)}" />     
        `;
    }

    _onBlur(e, todo) {
        const updatedTitle = e.target.value;

        store.dispatch(completeEditing(todo, updatedTitle))
    }

    _onKeyup(e, todo) {
        const updatedTitle = e.target.value;

        switch (e.key) {
            case "Enter":
                store.dispatch(completeEditing(todo, updatedTitle));
                break;
            case "Escape":
                store.dispatch(cancelEditing(todo));
                break;
        }
    }

    _stateChanged(state) {
        if (!this.todo)
            return;

        this.todo = state.todos.find(x => x.id === this.todo.id);
    }
}

window.customElements.define('edit-todo', EditTodo);
