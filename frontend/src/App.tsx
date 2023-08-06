import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import GetNumber from "./components/GetNumber";
import LoginForm from "./components/LoginForm";
import { useUserData } from "./hooks/api/useUserData";
import { userData } from "./types/types";

const App = () => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<userData>(["userData"]);

  useUserData();
  const exist = userData?.nick;
  useEffect(() => {}, [exist]);
  return <div className="App">{exist ? <GetNumber /> : <LoginForm />}</div>;
};

export default App;
