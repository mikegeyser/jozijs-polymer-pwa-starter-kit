class Todo {
    constructor(title, completed = false) {
        this.id = Number(new Date());
        this.title = title;
        this.editing = false;
        this.completed = completed;
    }
}

const defaultState = [
    new Todo("Add a todo", true),
    new Todo("List todos", true),
    new Todo("View a todo", true),
    new Todo("Complete a todo", true),
    new Todo("Delete a todo"),
    new Todo("Edit a todo"),
];

export const todos = (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const todoSelector = state => state.todos;