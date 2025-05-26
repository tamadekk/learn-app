import Image from 'next/image';
import { mockedAvatar } from '@/assets';
import { UserProfile } from '@/types';
import ProfileFieldComponent from './profile-field';
import Button from '@/components/ui/button';
import { PROFILE_FIELDS } from '@/constants/profile';
import { useState, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '@/lib/auth/validation';

interface ProfileInfoProps {
	user: UserProfile | null;
	onSubmit: (data: UserProfile, image: string | null) => Promise<void>;
	isSubmitting?: boolean;
}

const ProfileInfo = ({
	user,
	onSubmit,
	isSubmitting = false,
}: ProfileInfoProps) => {
	if (!user) return <div>Error: User not found</div>;

	const [isEditing, setIsEditing] = useState(false);
	const [previewImage, setPreviewImage] = useState<string | null>(null);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UserProfile>({
		defaultValues: user,
		resolver: zodResolver(profileSchema),
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				if (e.target?.result) {
					setPreviewImage(e.target.result as string);
				}
			};
		}
	};

	const handleFormSubmit: SubmitHandler<UserProfile> = async (data) => {
		try {
			await onSubmit(data, previewImage);
			setIsEditing(false);
		} catch (error) {
			console.error('Error in form submission:', error);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setPreviewImage(null);
		reset(user);
	};
	return isEditing ? (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			className='flex flex-col gap-4 p-8 sm:gap-6 border-m rounded-md border-neutral-200 shadow-xs'
		>
			<p className='text-2xl text-neutral-900 sm:text-3xl md:text-[48px]'>
				Edit profile
			</p>
			<div className='flex flex-wrap items-start gap-4 sm:gap-6'>
				<Image
					src={previewImage || user.photoURL || mockedAvatar}
					alt='profile'
					width={100}
					height={100}
					className='rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-[100px] md:h-[100px]'
				/>

				<div className='flex flex-col gap-1'>
					<p className='text-neutral-900'>Upload your photo</p>
					<p className='text-sm text-neutral-500'>
						Your photo should be in PNG or JPG format
					</p>
					<div className='flex gap-2'>
						<Button
							message='Choose image'
							variant='outline'
							type='button'
							onClick={() => fileInputRef.current?.click()}
						/>
						<input
							type='file'
							className='hidden'
							accept='image/png,image/jpeg'
							ref={fileInputRef}
							onChange={(e) => handleFileChange(e)}
						/>
						<Button
							message='Remove'
							variant='outline'
							type='button'
							onClick={() => setPreviewImage(null)}
						/>
					</div>
				</div>
			</div>
			<ul className='flex flex-col gap-3 sm:gap-4 w-full'>
				{PROFILE_FIELDS.map((field) => (
					<ProfileFieldComponent
						key={field.key}
						label={field.label}
						fieldKey={field.key}
						value={user[field.key] || ''}
						isEditing={isEditing}
						register={register}
						error={errors}
					/>
				))}
			</ul>
			<div className='flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-4'>
				<Button
					message={isSubmitting ? 'Saving...' : 'Save profile'}
					type='submit'
					disabled={isSubmitting}
				/>
				<Button
					message='Cancel'
					variant='secondaryButton'
					type='button'
					onClick={handleCancel}
					disabled={isSubmitting}
				/>
			</div>
		</form>
	) : (
		<div className='flex flex-col gap-4 sm:gap-6'>
			<p className='text-2xl text-neutral-900 sm:text-3xl md:text-[48px]'>
				My profile
			</p>
			<div className='flex flex-wrap items-start gap-4 sm:gap-6'>
				<Image
					src={previewImage || user.photoURL || mockedAvatar}
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
						fieldKey={field.key}
						value={user[field.key] || ''}
						isEditing={isEditing}
					/>
				))}
			</ul>
			<div className='flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-4'>
				<Button message='Edit profile' onClick={() => setIsEditing(true)} />
				<Button message='Change password' variant='secondaryButton' />
				<Button message='Delete profile' variant='importantButton' />
			</div>
		</div>
	);
};

export default ProfileInfo;
