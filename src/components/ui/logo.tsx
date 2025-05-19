import React from 'react';
import Image from 'next/image';
import { logo } from '@/assets';
import Link from 'next/link';

interface LogoProps {
	className?: string;
}

const Logo = (props: LogoProps) => {
	return (
		<Link href='/'>
			<Image
				className={props.className}
				src={logo.src}
				alt='The Learn App logo'
				width={100}
				height={100}
			/>
		</Link>
	);
};

export default Logo;
