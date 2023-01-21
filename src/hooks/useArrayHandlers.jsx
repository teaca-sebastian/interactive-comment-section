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

    function findCommentById(array, id) {
        for (const node of array) {
          if (node.id === id) return node;
          if (node.replies) {
            const child = findCommentById(node.replies, id);
            if (child) return child;
          }
        }
      }

    return { recursiveDelete, findCommentById }
}