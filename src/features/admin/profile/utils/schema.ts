import { z } from 'zod'

export const profileSchema = z.object({
    first_name: z.string().min(2, "First name is too short.").max(25, "First name is too long."),
    last_name: z.string().max(25, "Last name is too long.").optional(),
    company_name: z.string().min(2, "Company name is too short.").max(50, "Company name is too long."),
    email: z.string().email("Invalid Gmail address."),
    phone_number: z.string().regex(/^\d{10}$/, "Phone must be a 10-digit number."),
    bio: z.string().max(160, "Bio is too long.").optional(),
})


export const inputs = ['first_name', 'last_name', 'company_name', 'email', 'phone_number']



export const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, "Required."),
        newPassword: z
            .string()
            .min(6, "Password must be at least 6 characters long.")
            .max(30, "Password must be at most 30 characters."),
        reEnterPassword: z.string().min(1, "Required."),
    })
    .refine((data) => data.newPassword === data.reEnterPassword, {
        path: ["reEnterPassword"],
        message: "Passwords do not match.",
    });
