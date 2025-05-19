'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';

import { userIcon, padlockIcon, eyeOn, eyeOff } from '../../assets/index';
import { LoginFormValues } from '@/types';
import { loginSchema } from './validation';
import { userLogin, LoginResult } from './utils';
import Link from 'next/link';

const Login = () => {
	const [captchaCompleted, setCaptchaCompleted] = useState(false);
	const [captchaWarning, setCaptchaWarning] = useState(false);
	const [isPasswordVisible, setPasswordVisible] = useState(false);
	const [loginError, setLoginError] = useState<string | null>(null);

	const router = useRouter();
	const searchParams = useSearchParams();
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
	} = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

	const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
		if (!captchaCompleted) {
			setCaptchaWarning(true);
			return;
		}
		if (!data) return;

		setLoginError(null);
		const res = (await userLogin(data)) as LoginResult;

		if (res.success) {
			const returnUrl = searchParams.get('returnUrl') || '/';
			router.push(returnUrl);
		} else if (res.error) {
			setLoginError(res.error);
		}
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
				{(errors.email || errors.password) && (
					<p className='text-red-600 font-poppins font-semibold inline-block'>
						Please enter a valid email and password
					</p>
				)}
				<form
					className='flex flex-col items-center gap-4'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='flex flex-col'>
						<label className='text-sm font-semibold font-poppins'>Email</label>
						<Input<LoginFormValues>
							icon={userIcon}
							register={register}
							name='email'
							type='text'
							id='email'
							placeholder='Enter email'
							variant='withIcon'
						/>
					</div>
					<div className='flex flex-col'>
						<label className='text-sm font-semibold font-poppins'>
							Password
						</label>
						<Input<LoginFormValues>
							icon={padlockIcon}
							register={register}
							name='password'
							type={isPasswordVisible ? 'text' : 'password'}
							id='password'
							placeholder='Enter password'
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
					<Link href='/join-us'>
						<p className='text-sm text-neutral-500 font-poppins'>
							Don&apos;t have an account?{' '}
							<span className='text-indigo-700 font-bold cursor-pointer'>
								Sign up
							</span>
						</p>
					</Link>
					{captchaWarning && (
						<p className='text-sm text-red-500'>Please complete the captcha</p>
					)}
					{loginError && (
						<p className='text-sm text-red-500 mt-2'>{loginError}</p>
					)}
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
