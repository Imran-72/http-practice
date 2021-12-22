import axios from "axios";

axios.interceptors.response.use(
  (res) => res,
  function (error) {
    const expextedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expextedErrors) {
      console.log("Unexpected error");
    }
    return Promise.reject(error);
  }
);

const httpServise = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpServise;
