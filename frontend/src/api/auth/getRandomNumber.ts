import { END_POINTS } from "../../constants/api";
import { randomNumberData } from "../../types/types";
import { axiosInstance } from "../axiosInstance";

export const getRandomNumber = async () => {
  const response = await axiosInstance.get<randomNumberData>(
    END_POINTS.GET_NUMBER,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        withCredentials: true,
      },
    }
  );

  const numberData = response.data;

  return numberData;
};
