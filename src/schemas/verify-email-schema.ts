import {z} from "zod"

const VerifyEmailSchema = z.object({
    email: z.string().email(),
});

export default VerifyEmailSchema;
