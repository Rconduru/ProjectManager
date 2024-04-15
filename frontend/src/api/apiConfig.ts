import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "./exceptions";

const baseURL = `${
  process.env.REACT_APP_BASE_URL || "http://localhost:4000"
}/api/v1`;

const baseAuthURL = `${
  process.env.REACT_APP_BASE_URL || "http://localhost:4000"
}/auth`;

const errorMessages: { [key: number]: string } = {
  400: "Algo deu errado. Tente novamente mais tarde.",
  401: "Não autorizado a acessar este recurso.",
  404: "Recurso não encontrado.",
  500: "Erro de comunicação interna. Tente novamente mais tarde.",
  0: "Erro genérico, exception não tratada.",
};

const responseInterceptor = (response: AxiosResponse) => response;

/**
 * Intereptor to catch error caming from axios requests
 *
 * @param {AxiosError} error
 */
const responseErrorInterceptor = (error: AxiosError) => {
  const HTTPStatusCode = error.response ? error.response?.status : 0;

  const msg = JSON.stringify({ msg: errorMessages[HTTPStatusCode] });

  switch (true) {
    case HTTPStatusCode === 400:
      const errorData = error.response?.data as { message: string };
      throw new BadRequestException(errorData.message || msg);
    case HTTPStatusCode === 401:
      throw new UnauthorizedException(msg);
    case HTTPStatusCode === 404:
      throw new NotFoundException(msg);
    case HTTPStatusCode >= 500:
      throw new InternalServerErrorException(msg);
    default:
      console.error(error);
      throw new Error(
        JSON.stringify({
          msg: `HTTP status code: ${HTTPStatusCode} - ${errorMessages[0]}`,
        })
      );
  }

  //return Promise.reject(error.response)
};

const requestInterceptor = (
  request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const TOKEN = localStorage.getItem("access_token");

  request.headers["Authorization"] = `Bearer ${TOKEN}`;

  return request;
};

export {
  baseURL,
  baseAuthURL,
  responseInterceptor,
  responseErrorInterceptor,
  requestInterceptor,
};
