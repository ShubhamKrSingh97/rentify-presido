export const SESSION_NAME = 'rentify';
export const VARS = {
    isAuthenticated: 'isAuthenticated',
    token: 'token',
    userId: 'userId',
    role: 'role'
};


export const checkIsAuthenticated = () => {
    const isAuthenticated = sessionStorage.getItem(`${SESSION_NAME}.${VARS.isAuthenticated}`);
    if(isAuthenticated!=null){
        const r = isAuthenticated === 'true' ? true : false;
        return r;
    }
    return false;
}

export const saveToken = (token) => {
    sessionStorage.setItem(`${SESSION_NAME}.${VARS.token}`, token);
}

export const setIsAuthenticated = (val) => {
    sessionStorage.setItem(`${SESSION_NAME}.${VARS.isAuthenticated}`, val);
}

export const saveUserId = (val) => {
    sessionStorage.setItem(`${SESSION_NAME}.${VARS.userId}`, val);
}

export const getUserId = () => {
    return sessionStorage.getItem(`${SESSION_NAME}.${VARS.userId}`);
}

export const saveRole = (val) => {
    sessionStorage.setItem(`${SESSION_NAME}.${VARS.role}`, val);
}

export const getRole = () => {
    return sessionStorage.getItem(`${SESSION_NAME}.${VARS.role}`);
}

export const clearSession = () => {
    Object.keys(VARS).forEach((key) => {
        sessionStorage.removeItem(`${SESSION_NAME}.${key}`);
    })
}