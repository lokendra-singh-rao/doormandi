import {z} from "zod"

const loginSchema = z.object({
    email: z.string().email().optional(),
    phone: z.string().regex(/^\d{10}$/).optional(),
    password: z.string().min(6),
});

export default loginSchema;