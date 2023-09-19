import createHttp from "@/request/http";
const http = createHttp();

export const getRoute = () => http.get('/sys/menu/all');