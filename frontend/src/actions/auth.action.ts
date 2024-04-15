import { AxiosResponse } from "axios";
import { postAuth } from "../api/api";

export interface ILoginAction {
  username: string;
  password: string;
}

export interface ILoginSuccess {
  success: boolean;
  errorMessage: undefined | string;
}

interface ILoginResponseILoginSuccess {
  message: string;
  access_token: string;
}

export const login = async (
  username: string,
  password: string
): Promise<ILoginSuccess> => {
  try {
    const response: AxiosResponse<ILoginResponseILoginSuccess> = await postAuth(
      "/login",
      {
        user: username,
        password,
      }
    );

    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);

      return { success: true, errorMessage: undefined };
    }

    return { success: false, errorMessage: response.data.message };
  } catch (error: any) {
    return { success: false, errorMessage: error.message };
  }
};
