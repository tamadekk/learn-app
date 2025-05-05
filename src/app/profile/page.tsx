'use client';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/clientApp';
import { useState, useEffect } from 'react';
import { useGetUID } from '@/context/AuthContext';
import { UserProfile } from '@/types/user';
import ProfileInfo from '@/components/profile/ProfileInfo';

const Profile = () => {
	const [user, setUser] = useState<UserProfile | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
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

	if (isLoading) {
		return (
			<div className='min-h-screen max-w-7xl mx-auto px-5 mt-[50px] flex justify-center items-center'>
				<p className='text-xl'>Loading profile...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className='min-h-screen max-w-7xl mx-auto px-5 mt-[50px] flex justify-center items-center'>
				<p className='text-xl text-red-500'>{error}</p>
			</div>
		);
	}

	return (
		<div className='min-h-screen max-w-7xl mx-auto px-5 mt-[50px]'>
			<h1 className='text-5xl text-center text-neutral-900 font-bold sm:text-[56px]'>
				My Account
			</h1>
			<div className='flex flex-col gap-2 justify-center items-center mt-[50px] lg:flex-row lg:gap-0'>
				<ProfileInfo user={user} />
			</div>
		</div>
	);
};
export default Profile;
