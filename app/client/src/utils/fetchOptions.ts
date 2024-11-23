export const fetchOptions = () => {
    return {
        headers: {
            Authorization: localStorage.getItem('jwt') ?? '',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    };
};
