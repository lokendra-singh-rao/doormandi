import {z} from "zod"

const verifyEmailSchema = z.object({
    token: z.string()
});

export default verifyEmailSchema;
