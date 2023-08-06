import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../../api/auth/postLogin";

export const useLoginMutation = () => {
  const newLoginMutation = useMutation({
    mutationFn: postLogin,
    retry: 0,
  });

  return newLoginMutation;
};
