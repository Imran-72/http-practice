import axios from "axios";
import logger from "./logService";

axios.interceptors.response.use(
  (res) => res,
  function (error) {
    const expextedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expextedErrors) {
      logger.log(error);
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