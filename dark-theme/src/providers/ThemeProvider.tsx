import { useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

type Props = {
  children: React.ReactElement;
};

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
