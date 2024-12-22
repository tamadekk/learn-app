'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormValues } from '@/shared/Input/types';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';

import Input from '@/shared/Input/Input';
import Button from '@/shared/Button/Button';

import { userIcon, padlockIcon, eyeOn, eyeOff } from '../../assets/index';

const Login = () => {
	const [captchaCompleted, setCaptchaCompleted] = useState(false);
	const [isPasswordVisible, setPasswordVisible] = useState(false);

	const {
		register,
		formState: { isSubmitting },
		handleSubmit,
	} = useForm<IFormValues>();

	const onSubmit: SubmitHandler<IFormValues> = async (data) => {
		if (!captchaCompleted) return;
		await new Promise((resolve) => {
			setTimeout(resolve, 1000);
		});
		alert(JSON.stringify(data));
	};

	const handleToggle = () => {
		setPasswordVisible(!isPasswordVisible);
	};

	const handleCaptchaChange = (value: string | null) => {
		setCaptchaCompleted(value ? true : false);
	};

	return (
		<div className='min-h-screen flex items-center justify-center pb-32'>
			<div className='flex flex-col items-center gap-5'>
				<p className='text-3xl text-neutral-900 font-montserrat font-semibold'>
					Sign in
				</p>
				<p className='text-xl text-neutral-500 font-montserrat'>Welcome back</p>

				<form
					className='flex flex-col items-center gap-4'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='flex flex-col'>
						<label className='text-sm font-semibold font-poppins'>
							User name
						</label>
						<Input
							icon={userIcon}
							register={register}
							name='username'
							type='text'
							id='username'
							placeholder='Enter email'
							required
							variant='withIcon'
						/>
					</div>
					<div className='flex flex-col'>
						<label className='text-sm font-semibold font-poppins'>
							Password
						</label>
						<Input
							icon={padlockIcon}
							register={register}
							name='password'
							type={isPasswordVisible ? 'text' : 'password'}
							id='password'
							placeholder='Enter password'
							required
							variant='withIcon'
						>
							<div className='absolute right-3 top-3'>
								<button type='button' onClick={handleToggle}>
									<Image
										src={isPasswordVisible ? eyeOn.src : eyeOff.src}
										className='w-4'
										alt='Toggle visibility'
										width={16}
										height={16}
									/>
								</button>
							</div>
						</Input>
					</div>

					<Button
						message='Sign in'
						size='large'
						disabled={isSubmitting}
						variant='primeButton'
					/>
					<p className='text-xs text-neutral-500 font-poppins font-bold'>OR</p>
					<p className='text-sm text-neutral-500 font-poppins'>
						Don&apos;t have an account?{' '}
						<span className='text-indigo-700 font-bold cursor-pointer'>
							Sign up
						</span>
					</p>

					<ReCAPTCHA
						sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
						onChange={handleCaptchaChange}
					/>
				</form>
			</div>
		</div>
	);
};

export default Login;
