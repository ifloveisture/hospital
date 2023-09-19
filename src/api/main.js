import createHttp from "@/request/http";
const http = createHttp();

export const userinfo = (page = 1, limit = 1) => http.get('/userinfo',{page,limit});

export const serverlist = (page = 1, limit = 5) => http.get('/server/list',{page,limit});