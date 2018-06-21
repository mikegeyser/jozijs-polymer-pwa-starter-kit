class Todo {
    constructor(title) {
        this.id = Number(new Date());
        this.title = title;
        this.editing = false;
        this.completed = false;
    }
}

const defaultState = [new Todo("This is a test.")];

export const todos = (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const todoSelector = state => state.todos;