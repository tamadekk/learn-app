'use client';
import React, { useState } from 'react';
import Box from '@/shared/Box/Box';
import Button from '@/shared/Button/Button';

import { BOX_MOCKED_DATA } from '@/constants/constants';

const Blog = () => {
	const [isDisabled, setIsDisabled] = useState(false);

	const handleClick = async () => {
		setIsDisabled(true);
		await new Promise((resolve) => {
			setTimeout(resolve, 1000);
		});
		setIsDisabled(false);
	};
	return (
		<div className='flex flex-col justify-center items-center min-h-dvh mt-12 px-8 pb-72'>
			<h1 className='text-5xl text-neutral-900 text-center font-bold mb-20'>
				Blog
			</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				<Box blogs={BOX_MOCKED_DATA} />
			</div>
			<Button
				message='Load more articles'
				className='mt-14'
				disabled={isDisabled}
				onClick={handleClick}
			/>
		</div>
	);
};

export default Blog;
