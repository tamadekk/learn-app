import Image from 'next/image';
import { mockedAvatar, xmarkIcon } from '@/assets';
import Button from '@/shared/Button/Button';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { ProfileMenuProps, menuItems } from '@/types';

const ProfileMenu: React.FC<ProfileMenuProps> = ({ user, onClose }) => {
	const { logout } = useAuth();
	const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleLogout = async () => {
		try {
			setIsLoggingOut(true);
			await logout();
			setIsLoggingOut(false);
		} catch (err) {
			setError('Failed to logout. Please try again.');
			console.error('Logout error:', err);
		}
	};

	return (
		<div
			className='bg-white rounded-md shadow-lg absolute -top-4 right-0 w-64 border-2 border-neutral-200'
			role='dialog'
			aria-label='Profile menu'
		>
			<button
				onClick={onClose}
				className='cursor-pointer absolute top-2 right-2'
				aria-label='Close menu'
			>
				<Image src={xmarkIcon.src} alt='Close' width={24} height={24} />
			</button>
			<div className='flex gap-4 p-4 items-center border-b-2 border-neutral-200'>
				<Image
					src={user?.photoURL || mockedAvatar.src}
					alt='Profile Picture'
					width={50}
					height={50}
				/>
				<div>
					<p className='font-bold'>{user?.displayName || 'Guest'}</p>
					<p className='text-sm text-neutral-600'>
						{user?.email || 'No email'}
					</p>
				</div>
			</div>
			<nav className='flex flex-col gap-2 p-2 border-b-2 border-neutral-200 pb-32'>
				{menuItems.map((item) => (
					<button
						key={item.id}
						className='text-left flex items-center gap-2 py-2 px-3 rounded-md hover:bg-neutral-100 hover:text-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500'
						onClick={item.action}
						role='menuitem'
						tabIndex={0}
					>
						<Image src={item.src} alt={item.label} width={24} height={24} />
						{item.label}
					</button>
				))}
			</nav>
			<div className='flex gap-4 p-2 items-center'>
				{error && <p className='text-red-500 text-sm'>{error}</p>}
				<Button
					onClick={handleLogout}
					message={isLoggingOut ? 'Logging out...' : 'Logout'}
					disabled={isLoggingOut}
				/>
			</div>
		</div>
	);
};

export default ProfileMenu;
