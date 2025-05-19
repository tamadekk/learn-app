import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth, db } from '@/../firebase/clientApp';
import { loginSchema, registrationSchema } from '@/lib/auth/validation';
import { SubmitHandler } from 'react-hook-form';
import { LoginFormValues, RegistrationFormValues } from '@/types';
import { setDoc, doc } from 'firebase/firestore';

export type AuthResult<T = void> = {
	success: boolean;
	error?: string;
	data?: T;
};

export const userLogin: SubmitHandler<LoginFormValues> = async (
	data
): Promise<AuthResult> => {
	try {
		const validationResult = loginSchema.safeParse(data);
		if (!validationResult.success) {
			return {
				success: false,
				error: 'Invalid form data',
			};
		}

		const { email, password } = validationResult.data;
		await signInWithEmailAndPassword(auth, email, password);
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

export const createUser: SubmitHandler<RegistrationFormValues> = async (
	data
): Promise<AuthResult> => {
	try {
		const validationResult = registrationSchema.safeParse(data);
		if (!validationResult.success) {
			console.log(validationResult.error);
			return { success: false, error: validationResult.error.message };
		}
		const { firstName, lastName, email, specialization, password } =
			validationResult.data;
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const uid = res.user.uid;
		const userProfile = {
			uid,
			firstName: firstName,
			lastName: lastName,
			email: email,
			specialization: specialization,
			role: 'student',
		};
		await setDoc(doc(db, 'users', uid), userProfile);
		await updateProfile(res.user, {
			displayName: firstName,
		});
		return { success: true };
	} catch (error) {
		if (error instanceof FirebaseError) {
			switch (error.code) {
				case 'auth/email-already-in-use':
					return { success: false, error: 'Email is already registered' };
				case 'auth/invalid-email':
					return { success: false, error: 'Invalid email format' };
				case 'auth/operation-not-allowed':
					return {
						success: false,
						error: 'Email/password accounts are not enabled',
					};
				case 'auth/weak-password':
					return { success: false, error: 'Password is too weak' };
				default:
					console.error('Firebase error:', error.code, error.message);
					return {
						success: false,
						error: 'An error occurred during registration',
					};
			}
		}
		console.error('Unknown error:', error);
		return { success: false, error: 'An unexpected error occurred' };
	}
};
