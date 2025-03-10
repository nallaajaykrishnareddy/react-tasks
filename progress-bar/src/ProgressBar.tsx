import { useEffect, useState } from "react";
import "./App.css";

type Props = {
  value: number;
};

export const ProgressBar = ({ value }: Props) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timerID = setTimeout(() => setWidth(value), 1000);

    return () => clearTimeout(timerID);
  }, [value]);

  return (
    <div className="outer" key={width}>
      <div
        className="inner"
        style={{ transform: `translateX(${width - 100}%)` }}
        role="progressbar"
        aria-valuenow={width}
        aria-valuemax={100}
        aria-valuemin={0}
      >
        {width}%
      </div>
    </div>
  );
};
