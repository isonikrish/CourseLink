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
  role: String; //  TODO : ADD COURSES FROM USER 
}
export type courseFromData = {
  title: String,
  description: String,
}
export type course = {
  id: Number,
  tutorId: Number,
  tutor: User
  thumbnail: any
} & courseFromData

export type editCourse = {
  title?: String,
  description?: String,
  price?: Number,
  category?: String,
  thumbnail?: any
  
}