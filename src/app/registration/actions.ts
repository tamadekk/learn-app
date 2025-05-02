'use server';
import { SubmitHandler } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
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
			return;
		}
		const { firstName, lastName, email, specialization, password } =
			validationResult.data;
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const uid = userCredential.user.uid;
		const userProfile = {
			uid,
			firstName: firstName,
			lastName: lastName,
			email: email,
			specialization: specialization,
			role: 'student',
		};
		await setDoc(doc(db, 'users', uid), userProfile);
	} catch (e) {
		//TODO handle error
		console.error('An error occured', e);
	}
};
