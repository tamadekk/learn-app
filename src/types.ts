import { User } from 'firebase/auth';
import { StaticImageData } from 'next/image';

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
