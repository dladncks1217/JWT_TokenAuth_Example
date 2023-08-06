import { END_POINTS } from "../../constants/api";
import { userData } from "../../types/types";
import { axiosInstance } from "../axiosInstance";

export const getUserData = async () => {
  const response = await axiosInstance.get<userData>(END_POINTS.GET_USER, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      withCredentials: true,
    },
  });

  const userData = response.data;
  console.log(userData);

  return userData;
};
