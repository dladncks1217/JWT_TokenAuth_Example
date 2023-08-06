import { useQuery } from "@tanstack/react-query";

import type { AxiosError } from "axios";
import { getUserData } from "../../api/auth/getUserData";
import { userData } from "../../types/types";

export const useUserData = () => {
  const { data } = useQuery<userData, AxiosError>(["userData"], getUserData, {
    retry: 0,
  });
  // console.log(data);
  return data!;
};
