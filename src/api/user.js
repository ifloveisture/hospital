import createHttp from "@/request/http";
const http = createHttp();

/**
 * 
 * @param {} params 
 * @returns 
 */
export const login = (params) => http.post('/login',params);

/**
 * 
 * @param {} params 
 * @returns 
 */
export const reset = (params) => http.post('/sys/user/password',params);

export const logout = () => http.post('/logout');

export const userlist = (page = 1, limit = 10, username = '') => http.get('/sys/user/list',{page,limit,username});

export const adduser = (params) => http.post('/sys/user/create',params);

export const deleteuser = (params) => http.post('/sys/user/delete',params);

export const changestatus = (params) => http.post('/sys/user/status',params);

export const role = () => http.get('/sys/role/all');

export const deptlist = () => http.get('/sys/dept/all');