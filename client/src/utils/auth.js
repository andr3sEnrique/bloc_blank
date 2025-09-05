export const isConnected = (response, navigate) => {
    if (response.status === 401) {
        navigate('/auth');
        return false;
    }
    if (response.status === 403) {
        navigate('/');
        return false;
    }
    return true;
};
