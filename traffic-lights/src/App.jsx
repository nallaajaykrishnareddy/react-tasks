import { useState, useEffect, useCallback } from "react";
import "./App.css";

const App = () => {
  // State variables for traffic lights
  const [redLightActive, setRedLightActive] = useState(true);
  const [yellowLightActive, setYellowLightActive] = useState(false);
  const [greenLightActive, setGreenLightActive] = useState(false);

  // State variables for timers
  const [redTimer, setRedTimer] = useState(10);
  const [yellowTimer, setYellowTimer] = useState(5);
  const [greenTimer, setGreenTimer] = useState(15);

  // Manual override state
  const [manualOverride, setManualOverride] = useState(false);

  const [currentTime, setCurrentTime] = useState(redTimer);

  // Placeholder for light change logic
  const changeLights = useCallback(() => {
    if (redLightActive) {
      setRedLightActive(false);
      setGreenLightActive(true);
      setCurrentTime(greenTimer);
    } else if (yellowLightActive) {
      setYellowLightActive(false);
      setRedLightActive(true);
      setCurrentTime(redTimer);
    } else if (greenLightActive) {
      setGreenLightActive(false);
      setYellowLightActive(true);
      setCurrentTime(yellowTimer);
    }
  }, [
    greenLightActive,
    greenTimer,
    redLightActive,
    redTimer,
    yellowLightActive,
    yellowTimer,
  ]);

  // Effect to handle timer-based light changes
  useEffect(() => {
    if (manualOverride) return;

    let timerID;

    if (redLightActive) {
      timerID = setInterval(changeLights, 1000 * redTimer);
    }

    if (greenLightActive) {
      timerID = setInterval(changeLights, 1000 * greenTimer);
    }

    if (yellowLightActive) {
      timerID = setInterval(changeLights, 1000 * yellowTimer);
    }

    return () => clearInterval(timerID);
  }, [
    redLightActive,
    yellowLightActive,
    greenLightActive,
    redTimer,
    yellowTimer,
    greenTimer,
    manualOverride,
    changeLights,
  ]);

  useEffect(() => {
    if (manualOverride || currentTime <= 0) return;

    const timer = setInterval(() => {
      setCurrentTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentTime, manualOverride]);

  // Placeholder for increasing timer values
  const increaseTimer = (color) => {
    switch (color) {
      case "red":
        setRedTimer((c) => c + 5);
        setCurrentTime((c) => c + 5);
        break;
      case "yellow":
        setYellowTimer((c) => c + 5);
        setCurrentTime((c) => c + 5);

        break;
      case "green":
        setGreenTimer((c) => c + 5);
        setCurrentTime((c) => c + 5);

        break;
      default:
        throw new Error(`${color} is found`);
    }
  };

  // Placeholder for manually activating a specific light
  const activateLight = (color) => {
    switch (color) {
      case "red":
        setRedLightActive(true);
        setYellowLightActive(false);
        setGreenLightActive(false);
        break;
      case "yellow":
        setRedLightActive(false);
        setYellowLightActive(true);
        setGreenLightActive(false);
        break;
      case "green":
        setRedLightActive(false);
        setYellowLightActive(false);
        setGreenLightActive(true);
        break;
      default:
        throw new Error(`${color} is found`);
    }
  };

  return (
    <div>
      {/* Add HTML structure here */}
      {/* Example: Traffic light circles */}
      <div className="lights-container">
        <div
          data-testid="red-light"
          className="circle"
          style={{ backgroundColor: redLightActive ? "red" : "white" }}
        >
          {redLightActive ? currentTime : redTimer}
        </div>
        <div
          data-testid="yellow-light"
          className="circle"
          style={{ backgroundColor: yellowLightActive ? "yellow" : "white" }}
        >
          {yellowLightActive ? currentTime : yellowTimer}
        </div>
        <div
          data-testid="green-light"
          className="circle"
          style={{ backgroundColor: greenLightActive ? "green" : "white" }}
        >
          {greenLightActive ? currentTime : greenTimer}
        </div>
      </div>

      {/* Example: Buttons for manual control */}
      <div>
        <button onClick={() => activateLight("red")}>Activate Red</button>
        <button onClick={() => activateLight("yellow")}>Activate Yellow</button>
        <button onClick={() => activateLight("green")}>Activate Green</button>
      </div>

      {/* Example: Buttons for timer adjustments */}
      <div>
        <button onClick={() => increaseTimer("red")}>Increase Red Timer</button>
        <button onClick={() => increaseTimer("yellow")}>
          Increase Yellow Timer
        </button>
        <button onClick={() => increaseTimer("green")}>
          Increase Green Timer
        </button>
      </div>

      {/* Example: Display timer values */}
      <div>
        <p>Red Timer: {redTimer}s</p>
        <p>Yellow Timer: {yellowTimer}s</p>
        <p>Green Timer: {greenTimer}s</p>
      </div>
    </div>
  );
};

export default App;
