import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };
  const handleStop = () => {
    setIsRunning(false);
  };
  const handleReset = () => {
    setTime(0);
  };

  const formattedTime = `${String(Math.floor(time / 60)).padStart(
    2,
    "0"
  )}:${String(time % 60).padStart(2, "0")}`;

  return (
    <div className="p-4 grid justify-center">
      <h1 className="justify-self-center text-2xl text-black font-bold m-2">
        Stop Watch
      </h1>
      <h1 className="justify-self-center text-2xl text-black font-bold m-2">
        {formattedTime}
      </h1>
      <div>
        <button
          className="bg-sky-500 hover:bg-sky-700 hover:text-amber-50  p-2 m-4 w-3xs rounded-sm cursor-pointer"
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className="bg-sky-500 hover:bg-sky-700 hover:text-amber-50 p-2 m-4 w-3xs rounded-sm cursor-pointer"
          onClick={handleStop}
        >
          Pause
        </button>
        <button
          className="bg-sky-500 hover:bg-sky-700  hover:text-amber-50 p-2 m-4 w-3xs rounded-sm cursor-pointer"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
