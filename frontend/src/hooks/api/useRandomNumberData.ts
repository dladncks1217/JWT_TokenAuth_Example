import { useQuery } from "@tanstack/react-query";

import type { AxiosError } from "axios";
import { getRandomNumber } from "../../api/auth/getRandomNumber";
import { randomNumberData } from "../../types/types";

export const useRandomNumberData = () => {
  const { data, refetch } = useQuery<randomNumberData, AxiosError>(
    ["randomNumber"],
    getRandomNumber,
    {
      retry: 0,
    }
  );

  return { data, refetch };
};
