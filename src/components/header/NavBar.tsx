import React from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

interface Links {
	href: string;
	label: string;
}

interface NavBarProps {
	links: Links[];
}

const NavBar = (props: NavBarProps) => {
	const pathname = usePathname();
	return (
		<>
			{props.links.map((item) => (
				<nav key={item.href}>
					<a
						href={item.href}
						className={`block p-4 ${
							pathname === item.href
								? 'border-l-8 border-primary-500 text-primary-500 font-bold sm:border-none sm:font-normal'
								: ''
						}`}
					>
						{item.label}
					</a>
				</nav>
			))}
		</>
	);
};

export default NavBar;
