import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '@/../firebase/clientApp';
import { loginSchema } from './validation';
import { SubmitHandler } from 'react-hook-form';
import { LoginFormValues } from '@/shared/Input/types';

export type LoginResult = {
	success: boolean;
	error?: string;
};

export const userLogin: SubmitHandler<LoginFormValues> = async (
	data
): Promise<LoginResult> => {
	try {
		const validationResult = loginSchema.safeParse(data);
		if (!validationResult.success) {
			return {
				success: false,
				error: 'Invalid form data',
			};
		}

		const { username, password } = validationResult.data;
		await signInWithEmailAndPassword(auth, username, password);
		return {
			success: true,
		};
	} catch (error) {
		if (error instanceof FirebaseError) {
			console.log(error.code);
			switch (error.code) {
				case 'auth/too-many-requests':
					return {
						success: false,
						error: 'Too many attempts. Try again later',
					};
				case 'auth/invalid-email':
					return {
						success: false,
						error: 'Invalid email format',
					};
				case 'auth/user-disabled':
					return {
						success: false,
						error: 'This account has been disabled',
					};
				case 'auth/invalid-credential':
					return {
						success: false,
						error: 'Invalid email or password',
					};
				default:
					return {
						success: false,
						error: 'An error occurred during login',
					};
			}
		}

		return {
			success: false,
			error: 'An unexpected error occurred',
		};
	}
};
