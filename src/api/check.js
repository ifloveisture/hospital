import createHttp from "@/request/http";
const http = createHttp();

export const menulist = () => http.get('/check/menuList');

export const checkdetail = (id) => http.get('/check/menuList/detail',{id});