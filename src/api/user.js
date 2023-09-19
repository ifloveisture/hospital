import createHttp from "@/request/http";
const http = createHttp();

export const login = (params) => http.post('/login',params);

export const reset = (params) => http.post('/sys/user/password',params);

export const logout = () => http.post('/logout');

export const userlist = (page = 1, limit = 10, username = '') => http.get('/sys/user/list',{page,limit,username});

export const adduser = (params) => http.post('/sys/user/create',params);