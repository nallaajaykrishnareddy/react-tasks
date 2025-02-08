export type ButtonName = "Profile" | "Interest" | "Settings";

export type FormProps = {
  age: string;
  email: string;
  interest: string;
  isSubscribeToNewsLetter: boolean;
  notificationPreference: string;
};

export type FormErrors = {
  age?: string;
  email?: string;
  interest?: string;
  notificationPreference?: string;
  isSubscribeToNewsLetter?: string;
};
