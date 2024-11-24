export const fetchHeaders = () => {
    return {
        Authorization: localStorage.getItem('jwt') ?? '',
    };
};
