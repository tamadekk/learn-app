'use client';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/clientApp';
import { useState, useEffect } from 'react';
import { useGetUID } from '@/context/auth-context';
import { UserProfile } from '@/types';
import ProfileInfo from '@/components/profile/profile-info';
import Trainers from '@/components/profile/trainers';
import Trainings from '@/components/profile/trainings';

const Profile = () => {
	const [user, setUser] = useState<UserProfile | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { uid, loading } = useGetUID();

	useEffect(() => {
		if (!loading && uid) {
			const fetchUserData = async () => {
				try {
					const docRef = doc(db, 'users', uid);
					const res = await getDoc(docRef);
					if (res.exists()) {
						setUser(res.data() as UserProfile);
					} else {
						setError('User not found');
					}
				} catch (err) {
					console.error('Error fetching user data:', err);
					setError('Failed to fetch user data');
				} finally {
					setIsLoading(false);
				}
			};

			fetchUserData();
		}
	}, [loading, uid]);

	// Handle form submission from ProfileInfo component
	const handleFormSubmit = async (
		formData: UserProfile,
		imageData: string | null
	) => {
		setIsSubmitting(true);
		try {
			// Create a copy of the form data
			const updatedProfile = { ...formData };

			// Add the image if it exists
			if (imageData) {
				updatedProfile.photoURL = imageData;
			}

			const docRef = doc(db, 'users', uid!);

			// Create a clean object with only the fields that exist in the updatedProfile
			// This avoids issues with Firebase's updateDoc typing
			const cleanedData: Record<string, any> = {};

			// Only include fields that have values
			Object.entries(updatedProfile).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					cleanedData[key] = value;
				}
			});

			// Update the document with the cleaned data
			await updateDoc(docRef, cleanedData);

			// Update local state
			setUser(updatedProfile);

			// Show success message
			alert('Profile updated successfully');
		} catch (err) {
			console.error('Error updating user data:', err);
			setError('Failed to update user data');
			alert('Failed to update profile');
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading) {
		return (
			<div className='min-h-screen max-w-7xl mx-auto px-4 sm:px-5 mt-8 sm:mt-[50px] flex justify-center items-center'>
				<p className='text-lg sm:text-xl'>Loading profile...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className='min-h-screen max-w-7xl mx-auto px-4 sm:px-5 mt-8 sm:mt-[50px] flex justify-center items-center'>
				<p className='text-lg sm:text-xl text-red-500'>{error}</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen max-w-7xl mx-auto px-4 sm:px-5 mt-8 sm:mt-[50px] mb-8 sm:mb-[50px]'>
			<h1 className='text-4xl sm:text-5xl text-center text-neutral-900 font-bold md:text-[56px]'>
				My Account
			</h1>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mt-8 sm:mt-[50px]'>
				<ProfileInfo
					user={user}
					onSubmit={handleFormSubmit}
					isSubmitting={isSubmitting}
				/>
				<Trainers />
			</div>
			<Trainings />
		</div>
	);
};
export default Profile;
