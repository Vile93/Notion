export const fetchLocalUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user') as string);
    } catch {
        localStorage.removeItem('user');
        return null;
    }
};
