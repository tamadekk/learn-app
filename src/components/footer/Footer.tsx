import React from 'react';

import Logo from '@/assets/logo.png';

import FooterMenuSection from './FooterMenuSection';
import NewsLetter from './NewsLetter';
import FooterBottom from './FooterBottom';

const Footer = () => {
	return (
		<footer className='bg-neutral-100 py-10'>
			<nav className='container mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10 px-4'>
				<div className='hidden md:block'>{/* <Logo /> */}</div>
				<FooterMenuSection />
				<NewsLetter />
			</nav>
			<FooterBottom />
		</footer>
	);
};

export default Footer;
