import { useCallback, useState } from "react";
import { Button } from "./Button";
import { ButtonName, FormErrors, FormProps } from "./types";
import { Profile } from "./Profile";
import { Interest } from "./Interest";
import { Settings } from "./Settings";

const buttons: { id: number; name: ButtonName }[] = [
  {
    id: 1,
    name: "Profile",
  },
  {
    id: 2,
    name: "Interest",
  },
  {
    id: 3,
    name: "Settings",
  },
];

function App() {
  const [activeButtonName, setActiveButtonName] =
    useState<ButtonName>("Profile");

  const [formValues, setFormValues] = useState<FormProps>({
    age: "",
    email: "",
    interest: "",
    isSubscribeToNewsLetter: false,
    notificationPreference: "None",
  });

  const [errors, setErrors] = useState<FormErrors>({
    age: undefined,
    email: undefined,
    interest: undefined,
    notificationPreference: undefined,
    isSubscribeToNewsLetter: undefined,
  });

  const validateInputValues = useCallback(
    (fieldName: keyof FormProps, value: string) => {
      const ageRegex = /^\d+$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      switch (fieldName) {
        case "age":
          return ageRegex.test(value)
            ? undefined
            : "Age can not be empty and should be numeric";
        case "email":
          return emailRegex.test(value)
            ? undefined
            : "Please enter a valid email";
        case "interest":
          return value.length === 0 ? "Please select a interest" : undefined;
        case "isSubscribeToNewsLetter":
        case "notificationPreference":
          return undefined;
        default:
          throw new Error(`Not a valid ${fieldName}`);
      }
    },
    []
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const {
        target: { name, type },
      } = event;

      const value =
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : event.target.value;

      setFormValues((prevFormValues) => {
        return {
          ...prevFormValues,
          [name]: value,
        };
      });

      const error = validateInputValues(name as keyof FormProps, value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    },
    [validateInputValues]
  );

  const validateFormValues = useCallback(
    (fieldNamesToValidate: string[]) => {
      const tempErrors: Array<string> = [];
      fieldNamesToValidate.forEach((formFieldName) => {
        const err = validateInputValues(
          formFieldName as keyof FormProps,
          formValues[formFieldName as keyof FormProps]
        );
        if (err) {
          setErrors((prevErrors) => ({ ...prevErrors, [formFieldName]: err }));
          tempErrors.push(err);
        }
      });
      return tempErrors;
    },
    [formValues, validateInputValues]
  );

  const handleNext = () => {
    if (activeButtonName === "Profile") {
      if (validateFormValues(["age", "email"]).length > 0) {
        return;
      }
      setActiveButtonName("Interest");
    } else if (activeButtonName === "Interest") {
      if (validateFormValues(["interest"]).length > 0) {
        return;
      }
      setActiveButtonName("Settings");
    }
  };

  return (
    <>
      <div>
        {buttons.map((button) => {
          return (
            <Button
              isActive={activeButtonName === button.name}
              name={button.name}
              key={button.id}
            />
          );
        })}
        <div style={{ marginTop: "20px" }}>
          {activeButtonName === "Profile" && (
            <Profile
              handleChange={handleChange}
              formValues={formValues}
              errors={errors}
            />
          )}
          {activeButtonName === "Interest" && (
            <Interest
              handleChange={handleChange}
              formValues={formValues}
              errors={errors}
            />
          )}
          {activeButtonName === "Settings" && (
            <Settings handleChange={handleChange} formValues={formValues} />
          )}
          <br />
          <br />
          {activeButtonName === "Settings" ? (
            <button
              onClick={() => {
                alert(JSON.stringify(formValues, null, 3));
              }}
            >
              Submit
            </button>
          ) : (
            <button onClick={handleNext}>Next</button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
