import React from 'react';
import Image from 'next/image';
import { mockedAvatar } from '@/assets';

const ProfileCard = () => {
	return (
		<div className='flex flex-row gap-4'>
			<Image
				src={mockedAvatar.src}
				alt='Profile Picture'
				width={50}
				height={50}
			/>

			<div>
				<p className='font-bold'>John_12</p>
				<p className='text-neutral-500 font-normal'>John_12@gmail.com</p>
			</div>
		</div>
	);
};

export default ProfileCard;
