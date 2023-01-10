export const useClassConditional = () => {
    function classNames(...args) {
        return args.filter(Boolean).join(' ')
    }

    return( classNames )
}