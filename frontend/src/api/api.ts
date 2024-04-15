import axios from "axios";
import {
  baseURL,
  baseAuthURL,
  responseErrorInterceptor,
  responseInterceptor,
  requestInterceptor,
} from "./apiConfig";

const axiosInstance = axios.create({
  baseURL: baseURL || "",
  headers: {
    "content-type": "application/json",
  },
});

const axiosInstanceAuth = axios.create({
  baseURL: baseAuthURL || "",
  headers: {
    "content-type": "application/json",
  },
});

axiosInstanceAuth.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

axiosInstance.interceptors.request.use(requestInterceptor);

axiosInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

/**
 * GET Method for HTTP Request with axios instance
 *
 * @param {string} path
 */
const get = (path: string) => axiosInstance(path);

/**
 * POST Method for HTTP Request with axios instance
 *
 * @param {string} path
 * @param {Object} data
 */
const post = (path: string, data: Object) =>
  axiosInstance(path, { method: "POST", data });

/**
 * POST Method for HTTP Request with axios instance
 *
 * @param {string} path
 * @param {Object} data
 */
const postAuth = (path: string, data: Object) =>
  axiosInstanceAuth(path, { method: "POST", data });

/**
 * PUT Method for HTTP Request with axios instance
 *
 * @param {string} path
 * @param {Object} data
 */
const put = (path: string, data: Object) =>
  axiosInstance(path, { method: "PUT", data });

/**
 * PATCH Method for HTTP Request with axios instance
 *
 * @param {string} path
 * @param {string} data
 */
const patch = (path: string, data: string) =>
  axiosInstance(path, { method: "PATCH", data });

/**
 * DELETE Method for HTTP Request with axios instance
 *
 * @param {string} path
 */
const remove = (path: string) => axiosInstance(path, { method: "DELETE" });

export { get, post, postAuth, put, patch, remove };
