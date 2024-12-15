import React from 'react';

import { logo } from '@/assets';
import Link from 'next/link';

interface LogoProps {
	className?: string;
}

const Logo = (props: LogoProps) => {
	return (
		<Link href='/'>
			<img
				className={props.className}
				src={logo.src}
				alt='The Learn App logo'
			/>
		</Link>
	);
};

export default Logo;
