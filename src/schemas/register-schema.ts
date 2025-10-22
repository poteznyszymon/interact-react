import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, { error: "First name is required" }),
  lastName: z.string().min(1, { error: "Second name is required" }),
  username: z.string().min(1, { error: "Username is required" }),
  email: z
    .string()
    .min(1, { error: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z.string().min(1, { error: "Password is required" }),
});
