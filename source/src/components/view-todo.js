import {LitElement, html} from '@polymer/lit-element';
import {toggleCompletion} from '../actions/toggle-completion';
import {removeTodo} from '../actions/remove-todo';
import {store} from '../store.js';
import {connect} from "pwa-helpers/connect-mixin";
import {editTodo} from "../actions/edit-todo";

const styles = html`
<style>
    .toggle {
        text-align: center;
        width: 40px;
        /* auto, since non-WebKit browsers doesn't support input styling */
        height: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none; /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
        opacity: 0;
    }
        
    .toggle + label {
        /*
            Firefox requires \`#\` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
            IE and Edge requires *everything* to be escaped to render, so we do that instead of just the \`#\` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
        */
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
        background-repeat: no-repeat;
        background-position: center left;
    }
    
    .toggle:checked + label {
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
    }
    
    label {
        word-break: break-all;
        padding: 15px 15px 15px 60px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
    }
    
    label.completed {
        color: #d9d9d9;
        text-decoration: line-through;
    }
    
    button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        -webkit-appearance: none;
        appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .destroy {
        display: none;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
    }
    
    .destroy:hover {
        color: #af5b5e;
    }
    
    .destroy:after {
        content: '×';
    }

    .view:hover .destroy {
        display: block;
    }

</style>
`;

class ViewTodo extends connect(store)(LitElement) {
    static get properties() {
        return {
            todo: Object
        }
    }

    _render({todo}) {
        if (!todo || todo.editing)
            return html``;

        const computedCssClass = todo.completed ? `completed` : `incomplete`;

        let completed = todo.completed;
        return html`
            ${styles}
            
            <div class="view">
                <input class="toggle" 
                        type="checkbox" 
                        onclick="${() => this._toggleCompletion()}" 
                        checked="${completed}">
                <label class$="${computedCssClass}"
                       ondblclick="${() => this._editTodo()}">
                    ${todo.title}
                </label>
                <button class="destroy" onclick="${() => this._remove()}"></button>
            </div>          
        `;
    }

    _toggleCompletion() {
        store.dispatch(toggleCompletion(this.todo));
    }

    _editTodo() {
        store.dispatch(editTodo(this.todo));
    }

    _remove() {
        store.dispatch(removeTodo(this.todo));
    }

    _stateChanged(state) {
        if (!this.todo)
            return;

        this.todo = state.todos.find(x => x.id === this.todo.id);
    }
}

window.customElements.define('view-todo', ViewTodo);