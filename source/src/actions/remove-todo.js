export const REMOVE_TODO = 'REMOVE_TODO';

export const removeTodo = (todo) => {
    return {
        type: REMOVE_TODO,
        todo
    };
};