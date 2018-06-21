export const TOGGLE_COMPLETION = 'TOGGLE_COMPLETION';

export const toggleCompletion = (todo) => {
    return {
        type: TOGGLE_COMPLETION,
        todo
    };
};