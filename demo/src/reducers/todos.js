class Todo {
    constructor(title, id = Number(new Date()), completed = false) {
        this.id = id;
        this.title = title;
        this.editing = false;
        this.completed = completed;
    }
}

const defaultState = [
    new Todo("Add a todo", 1, true),
    new Todo("List todos", 2, true),
    new Todo("View a todo", 3, true),
    new Todo("Complete a todo", 4, true),
    new Todo("Delete a todo", 5),
    new Todo("Edit a todo", 6),
];

export const todos = (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const todoSelector = state => state.todos;