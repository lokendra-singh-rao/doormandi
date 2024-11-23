import { z } from "zod";

const LoginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, { message: "Password is required" }),
});

export default LoginSchema;
