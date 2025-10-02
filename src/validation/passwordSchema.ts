import z from 'zod';

export const passwordSchema = z.string().min(5, 'Minimum 5 characters');
// .refine(password => /[A-Z]/.test(password), {
//   message: 'Add one uppercase',
// })
// .refine(password => /[0-9]/.test(password), {
//   message: 'Add one number',
// })
// .refine(password => /[`!@#$%^&*()_\-+=§\[\]{};':"\\|,.<>\/?~ ]/.test(password), {
//   message: 'Add one special character',
// });
