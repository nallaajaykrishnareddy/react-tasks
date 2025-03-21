import React, { useState } from "react";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const checkPasswordStrength = () => {
    if (password.length < 8) {
      return alert("Password atleast 8 characters");
    }
    let matchedCriteria = 0;

    if (password.length >= 8) {
      matchedCriteria += 1;
    }

    if (/[a-z]/.test(password)) {
      matchedCriteria += 1;
    }

    if (/[A-Z]/.test(password)) {
      matchedCriteria += 1;
    }

    if (/[0-9]/.test(password)) {
      matchedCriteria += 1;
    }
    if (/[!@#$%^&*]/.test(password)) {
      matchedCriteria += 1;
    }

    if (matchedCriteria <= 2) {
      setStrength("Level1");
    } else if (matchedCriteria <= 4) {
      setStrength("Level2");
    } else {
      setStrength("Level3");
    }
  };

  return (
    <div>
      <h1>Password Strength Checker</h1>
      <div>
        <label htmlFor="password">Password:</label> &nbsp;
        <input
          type="text"
          name="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </div>
      <br />
      <div>
        <button onClick={checkPasswordStrength}>Check strength</button>
      </div>
      {strength}
    </div>
  );
};

const App = () => {
  return <PasswordStrengthChecker />;
};

export default App;
