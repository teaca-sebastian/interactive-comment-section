export const useArrayHandlers = () => {
    function recursiveDelete(data, deleteId) {
        const updatedData = data.reduce((acc, el) => {
            if (el.id !== deleteId) {
                const updatedEl = { ...el };
                if (Array.isArray(updatedEl.replies)) {
                    updatedEl.replies = recursiveDelete(updatedEl.replies, deleteId);
                }
                acc.push(updatedEl);
            }
            return acc;
        }, []);

        return updatedData;
    };

    return { recursiveDelete }
}