import { z } from "zod";


export const userRegistrationSchema = z.object({
   name: z.string(),
   email: z.string().email(),
   password: z.string(),
});

export const userLoginSchema = userRegistrationSchema.pick({
    email: true,
    password: true,
 }).extend({
    name: z.string().optional(),  // 👈 Name is optional for login
 });


export const bookRegistrationSchema = z.object({
    author: z.string(),
    title: z.string(), 
    genre: z.string(), 
    description: z.string()
}) 
 