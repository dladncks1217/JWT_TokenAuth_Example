import { useState } from "react";
import { useRandomNumberData } from "../hooks/api/useRandomNumberData";

const GetNumber = () => {
  const [number, setNumber] = useState(0);
  const { data, refetch } = useRandomNumberData();

  const handleClickButton = () => {
    refetch();
    if (data) {
      setNumber(data.number);
    }
  };

  return (
    <div>
      <div>{number}</div>
      <button onClick={handleClickButton}>번호발급</button>
    </div>
  );
};

export default GetNumber;
