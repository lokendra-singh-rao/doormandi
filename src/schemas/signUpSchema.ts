import { z } from 'zod';

const signUpSchema = z.object({
    fullname: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().length(10, "Phone number must be of 10 digits").regex(/^\d+$/, "Phone number must be digit only"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default signUpSchema;