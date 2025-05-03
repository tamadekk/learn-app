import React from 'react';
import Image from 'next/image';
import { mockedAvatar } from '@/assets';
import { useAuth } from '@/context/AuthContext';
import ProfileMenu from '@/components/Header/ProfileCard/ProfileMenu';
import { useState } from 'react';

const ProfileCard = () => {
	const { user } = useAuth();
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const toggleMenu = () => setShowMenu((prev) => !prev);

	return showMenu ? (
		<ProfileMenu user={user} onClose={toggleMenu} />
	) : (
		<div className='flex flex-row gap-4 items-center relative'>
			<div>
				<p className='font-bold'>{user?.displayName || null}</p>
			</div>
			<Image
				src={user?.photoURL || mockedAvatar.src}
				onClick={toggleMenu}
				alt='Profile Picture'
				width={50}
				height={50}
				className='cursor-pointer'
				role='button'
				tabIndex={0}
				aria-expanded={showMenu}
				aria-label='Toggle profile menu'
			/>
		</div>
	);
};

export default ProfileCard;
