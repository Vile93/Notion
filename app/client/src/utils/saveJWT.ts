export const saveJWT = (jwt: string) => {
    localStorage.setItem('jwt', `Bearer ${jwt}`);
};
