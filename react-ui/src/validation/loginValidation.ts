import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is requiered"),
  password: yup
    .string()
    .required("Password is requiered")
    .min(5, "Password is too short")
    .max(20, "Password is too long"),
});
