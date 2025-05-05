import Image from 'next/image';
import { mockedAvatar } from '@/assets';
import { UserProfile, ProfileField as ProfileFieldType } from '@/types/user';
import ProfileFieldComponent from './ProfileField';
import Button from '@/shared/Button/Button';

const PROFILE_FIELDS: ProfileFieldType[] = [
	{ label: 'First name', key: 'firstName' },
	{ label: 'Last name', key: 'lastName' },
	{ label: 'Username', key: 'firstName' },
	{ label: 'Specialization', key: 'specialization' },
	{ label: 'Address', key: 'address' },
	{ label: 'Email', key: 'email' },
];

interface ProfileInfoProps {
	user: UserProfile | null;
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
	if (!user) return null;

	return (
		<div>
			<p className='text-3xl text-neutral-900 font-bold sm:text-[48px]'>
				My profile
			</p>
			<div>
				<Image
					src={user.photoURL || mockedAvatar}
					alt='profile'
					width={100}
					height={100}
				/>
				<p className='text-lg text-neutral-500 mt-[20px] sm:text-xl'>
					Status: {user.status || 'Active'}
				</p>
			</div>
			<ul className='flex flex-col gap-4'>
				{PROFILE_FIELDS.map((field) => (
					<ProfileFieldComponent
						key={field.key}
						label={field.label}
						value={user[field.key] || 'Not set'}
					/>
				))}
			</ul>
			<Button message='Edit profile' />
			<Button message='Change password' variant='secondaryButton' />
		</div>
	);
};

export default ProfileInfo;
