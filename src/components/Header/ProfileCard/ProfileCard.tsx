import React from 'react';
import Image from 'next/image';
import { mockedAvatar } from '@/assets';
import { useAuth } from '@/context/AuthContext';

const ProfileCard = () => {
	const { user } = useAuth();
	return (
		<div className='flex flex-row gap-4'>
			<Image
				src={user?.photoURL || mockedAvatar.src}
				alt='Profile Picture'
				width={50}
				height={50}
			/>
			<div>
				<p className='font-bold'>{user?.displayName}</p>
				<p className='text-neutral-500 font-normal'>{user?.email}</p>
			</div>
		</div>
	);
};

export default ProfileCard;
