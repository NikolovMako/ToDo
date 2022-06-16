import * as yup from "yup";

export const todoSchema = yup.object().shape({
  description: yup
    .string()
    .min(5, "Description is too short")
    .max(255, "Description is too long"),
});
