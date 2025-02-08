import { FormErrors, FormProps } from "./types";

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formValues: FormProps;
  errors: FormErrors;
};

export const Profile = ({ handleChange, formValues, errors }: Props) => {
  const { age, email } = formValues;

  return (
    <>
      <label htmlFor="">Age:</label>
      <input name="age" id="age" value={age} onChange={handleChange} />
      <div style={{ color: "red", fontWeight: "bold" }}>
        {errors.age && errors.age}
      </div>
      <br />
      <br />
      <br />
      <label htmlFor="email">Email:</label>
      <input name="email" id="email" value={email} onChange={handleChange} />
      <div style={{ color: "red", fontWeight: "bold" }}>
        {errors.email && errors.email}
      </div>
    </>
  );
};
