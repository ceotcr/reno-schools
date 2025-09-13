import { z } from "zod";

export const emailSchema = z.object({
    email: z.string().email(),
});

export const otpSchema = z.object({
    otp: z.string().length(6),
});

export const nameSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
});

export type EmailSchema = z.infer<typeof emailSchema>;
export type OtpSchema = z.infer<typeof otpSchema>;
export type NameSchema = z.infer<typeof nameSchema>;
