'use client';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/ui/Logo';
import ProfileCard from './profile-card';
import Button from '@/components/ui/Button';
import NavBar from './nav-bar';

import { closeIcon, hamburgerIcon } from '@/assets';
import { desktopNavLinks, mobileNavLinks } from '@/constants/Header/constants';
import { useIsAuthenticated } from '@/context/auth-context';
import { useAuth } from '@/context/auth-context';
const Header = () => {
	const { isAuthenticated, loading } = useIsAuthenticated();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const handleClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	return (
		<header>
			<div className='flex justify-center items-center sm:justify-normal sm:border-b'>
				<Button
					className='absolute left-4 sm:hidden'
					onClick={handleClick}
					variant='icon'
				>
					<Image
						src={hamburgerIcon.src}
						alt='Menu icon'
						width={24}
						height={24}
					/>
				</Button>
				<Logo className='sm:ml-4 sm:mr-4' />
				<div className='hidden sm:flex sm:flex-row  sm:items-center sm:gap-5'>
					<NavBar links={desktopNavLinks} />
				</div>
				<div className='hidden sm:flex sm:items-center sm:absolute right-4 space-x-4'>
					{!loading && isAuthenticated ? (
						<>
							<ProfileCard />
						</>
					) : (
						<>
							<a className='text-primary-500' href='/login'>
								Sign in
							</a>
							<Link href='/join-us'>
								<Button message='Join us' />
							</Link>
						</>
					)}
				</div>

				{isMenuOpen && (
					<div className='absolute top-0 left-0 pl-4 pt-4 max-w-3/5 h-dvh border-r border-b bg-white sm:hidden'>
						<div className='flex flex-col gap-4'>
							<div className='flex flex-row gap-16'>
								{!loading && isAuthenticated ? (
									<>
										<ProfileCard />
									</>
								) : (
									<>
										<a className='text-primary-500' href='/login'>
											Sign in
										</a>
										<Link href='/join-us'>
											<Button message='Join us' />
										</Link>
									</>
								)}
								<Button onClick={handleClick} variant='icon'>
									<Image
										src={closeIcon.src}
										alt='Menu icon'
										width={24}
										height={24}
									/>
								</Button>
							</div>
							<NavBar links={mobileNavLinks} />
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
