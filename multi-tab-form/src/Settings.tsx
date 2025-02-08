import { FormProps } from "./types";

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formValues: FormProps;
};

export const Settings = ({
  handleChange,
  formValues: { notificationPreference },
}: Props) => {
  return (
    <>
      <label htmlFor="notificationPreference">Notification preferences:</label>
      <input
        type="radio"
        name="notificationPreference"
        id="notificationPreference"
        value="email"
        onChange={handleChange}
        checked={notificationPreference === "email"}
      />
      Email
      <input
        type="radio"
        name="notificationPreference"
        id="notificationPreference"
        value="SMS"
        onChange={handleChange}
        checked={notificationPreference === "SMS"}
      />
      SMS
      <input
        type="radio"
        name="notificationPreference"
        id="notificationPreference"
        value="None"
        onChange={handleChange}
        checked={notificationPreference === "None"}
      />
      None
    </>
  );
};
