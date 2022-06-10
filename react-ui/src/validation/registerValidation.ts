import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is requiered")
    .min(3, "Name is too short")
    .max(20, "Name is too long"),
  email: yup.string().email().required("Email is requiered"),
  password: yup
    .string()
    .required("Password is requiered")
    .min(5, "Password is too short")
    .max(20, "Password is too long"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is requiered")
    .min(5, "Password is too short")
    .max(20, "Password is too long")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
