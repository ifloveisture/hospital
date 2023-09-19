import axios from "axios";

let createRequest = (baseURL) => {
  console.log(baseURL)
  let request = axios.create({
    baseURL,
    timeout: 5000
  });

  request.interceptors.request.use(config => {
    console.log(config);
    let url = config.url;
    const token = sessionStorage.getItem('token');
    if(config.method === 'post') {
      config.headers["Content-Type"] = 'application/json';
      config.data = JSON.stringify(config.data);
    }
    if(url === '/captcha.jpg') {
      config.responseType = 'arraybuffer';
    }
    if (token) {
      config.headers['gaff-token'] = token;
    }
    return config;
  },error => {
    Promise.reject(error);
  });

  request.interceptors.response.use(response => {
    if(response.config.responseType === 'arraybuffer') {
      response.data = 'data:image/png;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    }
    return response;
  },error => {
    Promise.reject(error);
  });

  return request;
}

export default createRequest;