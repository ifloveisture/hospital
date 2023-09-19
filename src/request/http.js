import createRequest from "./request";

let createHttp = (url = '/api') => {
  let request = createRequest(url);

  return {
    get(url, params = {}) {
      return new Promise((resolve, reject) => {
        request.get(url, { params }).then((result) => {
          resolve(result.data);
        }).catch((err) => {
          reject(err.data);
        })
      });
    },
    post(url, params = {}) {
      return new Promise((resolve, reject) => {
        request.post(url, params).then((result) => {
          resolve(result.data);
        }).catch((err) => {
          reject(err.data);
        })
      })
    }
  }
}

export default createHttp;