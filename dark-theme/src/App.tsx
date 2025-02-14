import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div
        style={{
          height: "100vh",
          background: theme === "dark" ? "gray" : "white",
        }}
      >
        <button onClick={toggleTheme}>Toggle dark mode</button>
      </div>
    </>
  );
}

export default App;
