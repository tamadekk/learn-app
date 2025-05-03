import { User } from 'firebase/auth';
import { StaticImageData } from 'next/image';
import { circleUser, moon } from '@/assets';

export type Blogs = {
	id: string;
	img: StaticImageData;
	tag: string;
	title: string;
	date: string;
	duration: number;
};
export type IFormValues = {
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
	specialization: string;
	language: string;
};
export type Links = {
	href: string;
	label: string;
};

export type AuthContextType = {
	user: User | null;
	loading: boolean;
	error: Error | undefined;
	logout: () => Promise<void>;
	isAuthenticated: boolean;
};

export interface ProfileMenuProps {
	user: User | null;
	onClose: () => void;
}

export interface MenuItem {
	id: string;
	label: string;
	src: string;
	action: () => void;
}

export const menuItems: MenuItem[] = [
	{
		id: 'account',
		src: circleUser,
		label: 'My Account',
		action: () => console.log('Navigate to account'),
	},
	{
		id: 'night-mode',
		src: moon,
		label: 'Night mode',
		action: () => console.log('Toggle night mode'),
	},
];
