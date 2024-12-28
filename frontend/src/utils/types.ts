export type ThemeState = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};
export type signupFormData = {
  firstName: String;
  lastName: String;
  role: String;
} & loginFormData;

export type loginFormData = {
  email: String;
  password: String;
};
export type User = {
  id: Number;
  email: String;
  firstName: String;
  lastName: String;
  role: String;
}
