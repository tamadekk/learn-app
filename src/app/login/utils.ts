import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/../firebase/clientApp';
import { loginSchema } from './validation';
import { SubmitHandler } from 'react-hook-form';
import { LoginFormValues } from '@/shared/Input/types';

export const userLogin: SubmitHandler<LoginFormValues> = async (data) => {
	try {
		const validationResult = loginSchema.safeParse(data);
		if (!validationResult.success) {
			console.log(validationResult.error);
			return;
		}
		const { username, password } = validationResult.data;
		const res = await signInWithEmailAndPassword(auth, username, password);
		if (res) {
			return true;
		}
	} catch (error) {
		//TODO - handle error
		console.error(error);
	}
};
