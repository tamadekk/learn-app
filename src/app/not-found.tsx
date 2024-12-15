import React from 'react';
import Link from 'next/link';

// import { magnifierWorried } from '@/assets/index';
import Button from '@/shared/Button/Button';

const NotFound = () => {
	return (
		<div className='flex flex-col justify-center items-center gap-12 h-svh'>
			<div className='flex items-center gap-2 w-auto px-10'>
				<div className='hidden w-48 sm:block sm:w-64'>
					{/* <img src={magnifierWorried} alt='Broken Bulb' className='w-64' /> */}
				</div>
				<div>
					<h1 className='text-center text-5xl text-primary-550 font-montserrat font-semibold sm:text-9xl '>
						404
					</h1>
					<h2 className='text-center text-xl text-neutral-900 font-montserrat sm:text-2xl'>
						We're sorry, we couldn't find the page you requested.
					</h2>
				</div>
			</div>
			<div className='w-1/2'>
				<Link href='/'>
					<Button message='Go to Home' size='large' />
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
