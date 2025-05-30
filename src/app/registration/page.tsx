'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegistrationFormValues } from '@/types';
import Image from 'next/image';
import Input from '@/components/ui/input';
import Selector from '@/components/ui/selector';
import Button from '@/components/ui/button';
import { regTrainee, regStudent } from '@/assets';
import { specializations } from '@/constants/Registration/constants';

import { createUser, AuthResult } from '@/lib/auth/authentication';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '@/lib/auth/validation';
import { useRouter } from 'next/navigation';
//TODO handle role
const testRole = 'Student';

const Registration = () => {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const onSubmit = async (data: RegistrationFormValues) => {
		try {
			setError(null);
			const res = await createUser(data) as AuthResult;
			if (!res.success) {
				setError(res.error || 'Registration failed');
			} else {
				router.push('/login');
			}
		} catch (error) {
			setError('An unexpected error occurred during registration');
			console.error('Error during registration:', error);
		}
	};
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegistrationFormValues>({
		resolver: zodResolver(registrationSchema),
	});

	const displayImage = (role: string) => {
		return role === 'Student' ? regStudent.src : regTrainee.src;
	};

	return (
		<div className='flex justify-center items-center py-24'>
			<div className='flex flex-col'>
				<div className='flex flex-col gap-4 mb-9'>
					<h1 className='text-left text-5xl text-headerTextColo font-semibold'>
						Registration
					</h1>
					<p className='text-left text-neutral-500'>{testRole}</p>
				</div>
				<div className='flex min-h-fit gap-24'>
					<Image
						src={displayImage(testRole)}
						alt='A man with a laptop'
						width={451}
						height={625}
						className='border-xl rounded-xl'
					/>
					<form
						className='flex flex-col gap-6 w-[629px] min-h-fit'
						onSubmit={handleSubmit(onSubmit)}
					>
						{error && (
							<div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
								<p className='text-red-600 font-poppins text-sm'>{error}</p>
							</div>
						)}
						<Input<RegistrationFormValues>
							register={register}
							label='First Name'
							type='text'
							name='firstName'
							placeholder='Input text'
							required
							variant='transparent'
							error={errors.firstName}
						/>
						<Input<RegistrationFormValues>
							register={register}
							label='Last Name'
							type='text'
							name='lastName'
							placeholder='Input text'
							required
							variant='transparent'
							error={errors.lastName}
						/>
						<Input<RegistrationFormValues>
							register={register}
							label='Email'
							type='email'
							name='email'
							placeholder='Input text'
							required
							variant='transparent'
							error={errors.email}
						/>
						<Input<RegistrationFormValues>
							register={register}
							label='Password'
							type='password'
							name='password'
							placeholder='Input text'
							required
							variant='transparent'
							error={errors.password}
						/>
						<div>
							<label className='text-neutral-700 text-md font-bold'>
								Specialization
							</label>
							<Selector
								name='specialization'
								register={register}
								className='w-full'
								options={specializations}
								required
							/>
						</div>
						<Button
							type='submit'
							message='Submit'
							disabled={isSubmitting}
							size='large'
							className='mt-auto'
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Registration;
