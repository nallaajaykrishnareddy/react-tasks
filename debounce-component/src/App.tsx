import { useCallback } from "react";
import { DebouncedInput } from "./components/DebouncedInput";

function App() {
  const handleInput = useCallback((value: string) => {
    console.log(value);
  }, []);

  return (
    <>
      <DebouncedInput handleInput={handleInput} />
    </>
  );
}

export default App;
