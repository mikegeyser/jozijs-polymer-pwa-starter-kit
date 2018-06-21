export const CANCEL_EDITING= 'CANCEL_EDITING';

export const cancelEditing = (todo) => {
    return {
        type: CANCEL_EDITING,
        todo
    };
};