import React from 'react';
import Image from 'next/image';
import { mockedAvatar } from '@/assets';
import { useAuth } from '@/context/AuthContext';

const ProfileCard = () => {
	const { user } = useAuth();
	return (
		<div className='flex flex-row gap-4 items-center'>
			<div>
				<p className='font-bold'>{user?.displayName}</p>
			</div>
			<Image
				src={user?.photoURL || mockedAvatar.src}
				alt='Profile Picture'
				width={50}
				height={50}
			/>
		</div>
	);
};

export default ProfileCard;
