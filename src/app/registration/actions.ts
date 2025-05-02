'use server';
import { SubmitHandler } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../firebase/clientApp';
import { doc, setDoc } from 'firebase/firestore';

import { RegistrationFormValues } from '@/shared/Input/types';
import { registrationSchema } from './validation';

export const createUser: SubmitHandler<RegistrationFormValues> = async (
	data
) => {
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
