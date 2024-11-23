import { z } from "zod";

const RegisterSchema = z.object({
  fullname: z.string().min(2, "Name is required"),
  email: z.string({ required_error: "Email is required" }).min(1, "Email is required").email("Invalid email"),
  phone: z.string().length(10, "Phone number must be of 10 digits").regex(/^\d+$/, "Phone number must be digit only"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default RegisterSchema;
