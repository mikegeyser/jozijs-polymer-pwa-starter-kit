import {ADD_TODO} from '../actions/add-todo.js';
import {TOGGLE_COMPLETION} from '../actions/toggle-completion.js';
import {REMOVE_TODO} from "../actions/remove-todo";
import {EDIT_TODO} from "../actions/edit-todo";
import {COMPLETE_EDITING} from "../actions/complete-editing";
import {CANCEL_EDITING} from "../actions/cancel-editing";

class Todo {
    constructor(title) {
        this.id = Number(new Date());
        this.title = title;
        this.editing = false;
        this.completed = false;
    }
}

const addTodo = (state, action) => [...state, new Todo(action.todoText)];

const toggleCompletion = (state, action) => state.map(item => {
    if (item.id === action.todo.id) {
        return {
            ...action.todo,
            completed: !action.todo.completed
        };
    }

    return item;
});

const removeTodo = (state, action) => state.filter(item => item.id !== action.todo.id);

const editTodo = (state, action) => state.map(item => {
    if (item.id === action.todo.id) {
        return {
            ...action.todo,
            editing: true
        };
    }

    return item;
});

const completeEditing = (state, action) => state.map(item => {
    if (item.id === action.todo.id) {
        return {
            ...action.todo,
            title: action.updatedTitle,
            editing: false
        };
    }

    return item;
});

const cancelEditing = (state, action) => state.map(item => {
    if (item.id === action.todo.id) {
        return {
            ...action.todo,
            editing: false
        };
    }

    return item;
});

export const todos = (state = [new Todo("This is a test.")], action) => {
    switch (action.type) {
        case ADD_TODO:
            return addTodo(state, action);

        case TOGGLE_COMPLETION:
            return toggleCompletion(state, action);

        case REMOVE_TODO:
            return removeTodo(state, action);

        case EDIT_TODO:
            return editTodo(state, action);

        case COMPLETE_EDITING:
            return completeEditing(state, action);

        case CANCEL_EDITING:
            return cancelEditing(state, action);

        default:
            return state;
    }
};

export const todoSelector = state => state.todos;