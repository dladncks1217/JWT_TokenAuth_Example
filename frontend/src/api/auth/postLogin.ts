import { END_POINTS } from "../../constants/api";
import { LoginData } from "../../types/types";
import { axiosInstance } from "../axiosInstance";

export const postLogin = async (loginData: LoginData) => {
  const response = await axiosInstance.post(END_POINTS.LOGIN, loginData, {
    withCredentials: true,
  });

  const loginResult = response.data;
  localStorage.setItem("accessToken", loginResult.data.accessToken);

  return loginResult;
};
