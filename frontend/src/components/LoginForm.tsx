import { FormEvent, useState } from "react";
import { useLoginMutation } from "../hooks/api/useLoginMutation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const newLoginMutation = useLoginMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newLoginMutation.mutate({ email, password });
  };

  const handleEmail = (event: FormEvent<HTMLInputElement>) => {
    const word = event.currentTarget.value;
    setEmail(word);
  };

  const handlePassword = (event: FormEvent<HTMLInputElement>) => {
    const word = event.currentTarget.value;
    setPassword(word);
  };

  return (
    <form onSubmit={handleSubmit}>
      email: <input type="email" name="email" onChange={handleEmail} />
      <br />
      password:{" "}
      <input type="password" name="password" onChange={handlePassword} />
      <br />
      <button>제출</button>
    </form>
  );
};

export default LoginForm;
