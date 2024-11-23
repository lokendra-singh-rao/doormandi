import {z} from "zod"

const VerifyEmailSchema = z.object({
    token: z.string()
});

export default VerifyEmailSchema;
