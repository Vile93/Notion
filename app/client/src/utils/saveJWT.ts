export const saveJWT = (jwt: string) => {
    localStorage.setItem('Bearer jwt', jwt);
};
