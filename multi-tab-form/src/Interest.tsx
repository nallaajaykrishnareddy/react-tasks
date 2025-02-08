import { FormErrors, FormProps } from "./types";

type Props = {
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  formValues: FormProps;
  errors: FormErrors;
};

export const Interest = ({ handleChange, formValues, errors }: Props) => {
  const { interest, isSubscribeToNewsLetter } = formValues;
  return (
    <>
      <label htmlFor="interest">Interest</label>
      <select
        name="interest"
        id="interest"
        onChange={handleChange}
        value={interest}
      >
        <option value="">Select a interest</option>
        <option value="music">Music</option>
        <option value="sports">Sports</option>
      </select>
      <div style={{ color: "red" }}>
        {errors.interest ? errors.interest : ""}
      </div>
      <br />
      <br />
      <input
        type="checkbox"
        name="isSubscribeToNewsLetter"
        checked={isSubscribeToNewsLetter}
        onChange={handleChange}
      />
      Subscribe to Newsletter
    </>
  );
};
