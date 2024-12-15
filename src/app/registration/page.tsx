'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormValues } from '@/shared/Input/types';

import Input from '@/shared/Input/Input';
import Selector from '@/shared/Selector/Selector';
import Button from '@/shared/Button/Button';

import { regTrainee, regStudent } from '@/assets';
import { specializations } from '@/constants/Registration/constants';

const testRole = 'Student';

const Registration = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IFormValues>();

	const onSubmit: SubmitHandler<IFormValues> = async (data) => {
		await new Promise((resolve) => {
			setTimeout(resolve, 1000);
		});
		alert(JSON.stringify(data));
	};

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
					<img
						src={displayImage(testRole)}
						alt='A man with a laptop'
						className='w-[451px] h-[625px] border-xl rounded-xl'
					/>
					<form
						className='flex flex-col gap-6 w-[629px] min-h-fit'
						onSubmit={handleSubmit(onSubmit)}
					>
						<Input
							register={register}
							label='First Name'
							type='text'
							name='firstName'
							placeHolder='Input text'
							required
							variant='transparent'
							error={errors.firstName}
							validation={{
								minLength: 2,
							}}
						/>

						<Input
							register={register}
							label='Last Name'
							type='text'
							name='lastName'
							placeHolder='Input text'
							required
							variant='transparent'
							error={errors.lastName}
							validation={{
								minLength: 2,
							}}
						/>

						<Input
							register={register}
							label='Email'
							type='email'
							name='email'
							placeHolder='Input text'
							required
							variant='transparent'
							error={errors.email}
							validation={{
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: 'Please enter a valid email address.',
								},
							}}
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
