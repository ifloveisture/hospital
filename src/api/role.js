import createHttp from "@/request/http";
const http = createHttp();

export const rolelist = (page = 1, limit = 10, roleCode) => http.get('/sys/role/list', {page, limit, roleCode});

export const addrole = (params) => http.post('/sys/role/create',params);

export const roleinfo = (id) => http.get(`/sys/role/info/${id}`);