import type { AxiosError } from "axios";
import axios from "axios";

import { BASE_URL, END_POINTS, HTTP_STATUS_CODE } from "../constants/api";
import { HTTPError } from "./HTTPError";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post(
      END_POINTS.REISSUANCE,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      }
    );

    const { accessToken } = response.data.data;
    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data.message === "jwt expired"
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

interface ErrorResponseData {
  statusCode?: number;
  message?: string;
}

export const handleAPIError = (error: AxiosError<ErrorResponseData>) => {
  if (!error.response) throw Error("에러가 발생했습니다.");

  const { data, status } = error.response;

  if (status >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    throw new HTTPError(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, data.message);
  }

  if (status === HTTP_STATUS_CODE.NOT_FOUND) {
    throw new HTTPError(HTTP_STATUS_CODE.NOT_FOUND, data.message);
  }

  if (status >= HTTP_STATUS_CODE.BAD_REQUEST) {
    throw new HTTPError(HTTP_STATUS_CODE.BAD_REQUEST, data.message);
  }
};

axiosInstance.interceptors.response.use((response) => response, handleAPIError);
