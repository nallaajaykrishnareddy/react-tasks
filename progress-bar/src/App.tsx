import { ProgressBar } from "./ProgressBar";

const widths = [0, 5, 10, 20, 30, 40, 50, 60, 100];

function App() {
  return widths.map((width) => <ProgressBar value={width} key={width} />);
}

export default App;
