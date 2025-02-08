import { ButtonName } from "./types";

type Props = {
  name: ButtonName;
  isActive: boolean;
  handleButtonClick?: (buttonName: ButtonName) => void;
};

export const Button = ({ name, isActive, handleButtonClick }: Props) => {
  return (
    <button
      style={{
        height: "30px",
        width: "120px",
        backgroundColor: isActive ? "burlywood" : "grey",
        color: "white",
        margin: "5px",
        cursor: "pointer",
      }}
      onClick={() => handleButtonClick && handleButtonClick(name)}
    >
      {name}
    </button>
  );
};
