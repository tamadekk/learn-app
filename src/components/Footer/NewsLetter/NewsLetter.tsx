'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IFormValues } from '@/shared/Input/types';

import { emailIcon } from '@/assets';

import Button from '@/shared/Button/Button';
import Input from '@/shared/Input/Input';

const NewsLetter = () => {
	const { register } = useForm<IFormValues>();
	const handleClick = () => {};
	return (
		<section
			aria-labelledby='footer-newsletter'
			className='text-center md:text-left'
		>
			<h2 id='footer-newsletter' className='text-primary-500 font-bold mb-2'>
				Subscribe to our newsletter
			</h2>
			<p className='text-sm mb-4'>
				For product announcements and exclusive insights
			</p>
			<div className='flex justify-center md:justify-start'>
				<Input
					register={register}
					type='email'
					name='email'
					placeholder='Input your email'
					icon={emailIcon}
					required
					variant='withIconTransparent'
				/>
				<Button message='Subscribe' onClick={handleClick} />
			</div>
		</section>
	);
};

export default NewsLetter;
