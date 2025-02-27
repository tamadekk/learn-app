import { z } from 'zod';

export const registrationSchema = z.object({
	firstName: z.string().min(2, {
		message: 'First name must be at least 2 characters long',
	}),
	lastName: z.string().min(2, {
		message: 'Last name must be at least 2 characters long',
	}),
	email: z.string().email({
		message: 'Email must be a valid email address',
	}),
	specialization: z.string().nonempty({
		message: 'Specialization must not be empty',
	}),
});
