import Image from 'next/image';
import { mockedAvatar } from '@/assets';
import { UserProfile } from '@/types';
import ProfileFieldComponent from './profile-field';
import Button from '@/components/ui/button';
import { PROFILE_FIELDS } from '@/constants/profile';

interface ProfileInfoProps {
	user: UserProfile | null;
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
	if (!user) return <div>Error: User not found</div>;

	return (
		<div className='flex flex-col gap-4 sm:gap-6'>
			<p className='text-2xl text-neutral-900 sm:text-3xl md:text-[48px]'>
				My profile
			</p>
			<div className='flex flex-wrap items-start gap-4 sm:gap-6'>
				<Image
					src={user.photoURL || mockedAvatar}
					alt='profile'
					width={100}
					height={100}
					className='rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-[100px] md:h-[100px]'
				/>
				<ul className='text-base sm:text-lg text-neutral-500 mt-2 sm:mt-[20px] md:text-xl'>
					<li className='flex flex-col'>
						<span>Status</span>
						<span className='text-green-500'>{user.status || 'Active'}</span>
					</li>
				</ul>
			</div>
			<ul className='flex flex-col gap-3 sm:gap-4 w-full'>
				{PROFILE_FIELDS.map((field) => (
					<ProfileFieldComponent
						key={field.key}
						label={field.label}
						value={user[field.key] || 'Not set'}
					/>
				))}
			</ul>
			<div className='flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-4'>
				<Button message='Edit profile' />
				<Button message='Change password' variant='secondaryButton' />
				<Button message='Delete profile' variant='importantButton' />
			</div>
		</div>
	);
};

export default ProfileInfo;
