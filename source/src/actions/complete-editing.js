export const COMPLETE_EDITING= 'COMPLETE_EDITING';

export const completeEditing = (todo, updatedTitle) => {
    return {
        type: COMPLETE_EDITING,
        todo,
        updatedTitle
    };
};