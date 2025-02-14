import { useCallback, useEffect, useState } from "react";

type Props = {
  handleInput: (typedValue: string) => void;
  delay?: number;
};

export const DebouncedInput = ({ handleInput, delay = 1000 }: Props) => {
  const [value, setValue] = useState("");

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      handleInput(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [handleInput, value, delay]);

  return <input name="search" onChange={handleChange} value={value} />;
};
