The Polymer PWA Starter Kit

Today we will build a PWA! We will take one part polymer, one part lit-html, and one part redux. We will then mix thoroughly and place on top of a sw-precache configured service worker. Covering the result with a combination of chrome puppeteer and WCT suites, we will bake it for approximately 45 minutes using the polymer-cli.

This code-heavy talk will look at lit-html, LitElement, and the PWA Starter Kit. We will explore how the starter kit is set up, and build a simple PWA using it.

- Polymer 3
    - Why? 
    
- Lit-html
    - Why?
    - Demo
        - Template literals
        - Tagged template literals
        - lit-html tagged template literals
        
- LitElement
    - Why?
    - Demo
        -
         
- Starter Kit
    - Why?
    - Pieces
        - LitElement
        - Redux
        - Helpers
        - Testing
        - PRPL Server        
        - Samples
            - https://polymer.github.io/pwa-starter-kit/sample-apps/
    
- TodoMVC
    - Bare bones project
        - App shell
            - CSS Sharing?
            
        - Add todo
            - Element
            - Event response
            - Add action
            - Create store, reducer and class
            - Respond to action, and initialise state
            
        - List todo
            - Element
            - Bind to state
            - Map list of todos to li
            
        - View todo
            - Element
            - Properties getter
            
        - Complete todo
            - Click event
            - Add Action
            - Add Reducer
            - Implement state changed
            - Conditional CSS and class$/ClassName/class (in view and list)
                        
            
        - Delete todo 
            - Button with click event
            - Action
            - Reducer
            
        - Edit todo
            - Dbl Click event
            - Hide if editing
            - Action
            - Reducer
            - Element
            - Add element to view-todo
            - Add blur and keyup events
            - Add complete and cancel action, and reducers
              
        - Build
            - Show size, serviceworker and offline.
        
        
# App shell

# Add todo
- Element
- Event response
- Add action
- Create store, reducer and class
- Respond to action, and initialise state

> components/add-todo.js
```javascript

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
```

> actions/add-todo.js
```js
export const ADD_TODO = 'ADD_TODO';

export const addTodo = (todoText) => {
    return {
        type: ADD_TODO,
        todoText
    };
};
```

> reducers/todo.js
```js
case ADD_TODO:
    return [...state, new Todo(action.todoText)];
```

> components/my-app.js
```javascript
import './add-todo';

<add-todo></add-todo>
```

# List Todos
- Element
- Bind to state
- Map list of todos to li
- Conditional state and class$/ClassName/class

> components/my-app.js
```javascript
import './todo-list';

<todo-list></todo-list>
```

> components/todo-list.js
```javascript
import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { SharedStyles } from './shared-styles';
import { todoSelector } from '../reducers/todos.js';

class TodoList extends connect(store)(LitElement) {
    static get properties() {
        return { todos: Array };
    }

    _render({ todos }) {
        return html`
             ${SharedStyles}
            
            <ul class="todo-list">
                ${todos.map(todo => html`
                <li>${todo.title}</li>
                `)}
            </ul>
        `;
    }

    _stateChanged(state) {
        this.todos = todoSelector(state);
    }
}

window.customElements.define('todo-list', TodoList);
```

# View Todo
- Element
- Properties getter

> components/todo-list.js
```html
import './view-todo';

<li>
    <view-todo todo="${todo}"></view-todo>
</li>
```

> components/view-todo.js

```js
import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { ViewTodoStyles } from './shared-styles';

class ViewTodo extends connect(store)(LitElement) {
    static get properties() {
        return { todo: Object };
    }

    _render({ todo }) {
        return html`
            ${ViewTodoStyles}
            
            <div class="view">
                <input class="toggle" type="checkbox">
                <label>
                    ${todo.title}
                </label>
                <button class="destroy"></button>
            </div>
        `;
    }

    _stateChanged(state) { }
}

window.customElements.define('view-todo', ViewTodo);
```

# Complete todo
- Click event
- Conditional CSS and class$/ClassName/class (in view and list)
- Add Action
- Add Reducer
- Implement state changed

> components/view-todo.js
```js
const computedCssClass = todo.completed ? `completed` : `incomplete`;

<input class="toggle" 
        type="checkbox" 
        onclick="${() => this._toggleCompletion()}" 
        checked="${todo.completed}">
<label class$="${computedCssClass}">
    ${todo.title}
</label>

_toggleCompletion() {
    store.dispatch(toggleCompletion(this.todo));
}
```

> actions/toggle-completion.js

```javascript
export const ADD_TODO = 'ADD_TODO';

export const addTodo = (todoText) => {
    return {
        type: ADD_TODO,
        todoText
    };
};
```

> reducers/todo.js

```js
case TOGGLE_COMPLETION:
    return state.map(item => {
        if (item.id === action.todo.id) {
            return {
                ...item,
                completed: !item.completed
            };
        }

        return item;
    });
```

# Remove todo 
- Button with click event
- Action
- Reducer

> components/view-todo.js

```javascript
<button class="destroy" onclick="${(e) => this._remove()}"></button>

_remove() {
    store.dispatch(removeTodo(this.todo));
}
```

> actions/remove-todo.js
```js
export const REMOVE_TODO = 'REMOVE_TODO';

export const removeTodo = (todo) => {
    return {
        type: REMOVE_TODO,
        todo
    };
};
```

> reducers/todo.js
```js
case REMOVE_TODO:
    return state.filter(x => x.id !== action.todo.id);
```

#Edit todo
- Double Click event
- Hide if editing
- Action
- Reducer
- Element
- Add element to view-todo
- Add blur and keyup events
- Add complete and cancel action, and reducers

> components/view-todo.js
```js
ondblclick="${(e) => this._editTodo()}"

_editTodo(){
    store.dispatch(editTodo(this.todo));
}
```

> actions/edit-todo.js
```js
export const EDIT_TODO = 'EDIT_TODO';

export const editTodo = (todo) => {
    return {
        type: EDIT_TODO,
        todo
    };
};
```

> reducers/todo.js
```js
case EDIT_TODO:
    return state.map(item => {
        if (item.id === action.todo.id) {
            return {
                ...item,
                editing: true
            };
        }

        return item;
    });
```

> components/todo-list.js
```js
import './edit-todo';

<edit-todo todo="${todo}"></edit-todo>
```

> components/edit-todo.js
```js
import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { SharedStyles } from './shared-styles';
import { completeEditing } from '../actions/complete-editing.js';

class EditTodo extends connect(store)(LitElement) {
    static get properties() {
        return {
            todo: Object
        }
    };

    _render({ todo }) {
        return html`
             ${SharedStyles}
            
            <input type="text" class="edit" 
                value="${todo.title}">
        `;
    }

    _stateChanged(state) {
        if (!this.todo)
            return;

        this.todo = state.todos.find(x => x.id === this.todo.id);
    }
}

window.customElements.define('edit-todo', EditTodo);
```

> components/edit-todo.js
```js
onblur="${(e) => this._onBlur(e)}"
onkeyup="${(e) => this._onKeyup(e)}"

_onBlur(e) { }
_onKeyup(e) { }
```

> actions/complete-editing.js
```js
export const COMPLETE_EDITING = 'COMPLETE_EDITING';

export const completeEditing = (todo, updatedTodoText) => {
    return {
        type: COMPLETE_EDITING,
        todo, 
        updatedTodoText
    };
};
```

> actions/cancel-editing.js
```js
export const CANCEL_EDITING = 'CANCEL_EDITING';

export const cancelEditing = (todo) => {
    return {
        type: CANCEL_EDITING,
        todo
    };
};
```

> components/edit-todo.js
```js
_onBlur(e) {
    store.dispatch(completeEditing(this.todo, e.target.value));
}

_onKeyup(e) {
    switch (e.key) {
        case "Enter":
            return store.dispatch(completeEditing(this.todo, e.target.value));
        case "Escape":
            return store.dispatch(cancelEditing(this.todo));
    }
}
```

> reducers/todos.js

```js
case COMPLETE_EDITING:
            return state.map(item => {
                if (item.id === action.todo.id) {
                    return {
                        ...item,
                        title: action.updatedTodoText,
                        editing: false
                    };
                }

                return item;
            });

case CANCEL_EDITING:
    return state.map(item => {
        if (item.id === action.todo.id) {
            return {
                ...item,
                editing: false
            };
        }

        return item;
    });
```

> components/edit-todo.js
```js
if (!todo.editing) return html``;
```

> components/view-todo.js
```js
if (todo.editing) return html``;
```

# Build

> push-manifest.json
```json
{
  "/": {
    "src/components/my-app.js": {
      "type": "script",
      "weight": 1
    },
    "node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js": {
      "type": "script",
      "weight": 1
    }
  }
}
```

> sw-precache.config.js

```js
{
    urlPattern: /todomvc/,
    handler: 'fastest'
}
```

> npm run build:prpl-server

> npm run serve:prpl-server