export const EDIT_TODO = 'EDIT_TODO';

export const editTodo = (todo) => {
    return {
        type: EDIT_TODO,
        todo
    };
};