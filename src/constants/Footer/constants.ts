import { youtubeIcon, facebookIcon, twitterIcon } from '@/assets/index';

export const FOOTER_SOCIAL_LINKS = [
	{ href: 'https://x.com/', icon: twitterIcon, alt: 'X-Twitter icon' },
	{
		href: 'https://www.facebook.com/',
		icon: facebookIcon,
		alt: 'Facebook icon',
	},
	{ href: 'https://www.youtube.com/', icon: youtubeIcon, alt: 'YouTube icon' },
];
export const FOOTER_MENU_LINKS = [
	{
		title: 'Product',
		links: [
			{ path: '/features', label: 'Features' },
			{ path: '/pricing', label: 'Pricing' },
		],
	},
	{
		title: 'Resources',
		links: [
			{ path: '/blog', label: 'Blog' },
			{ path: '/user-guides', label: 'User Guides' },
			{ path: '/webinars', label: 'Webinars' },
		],
	},
	{
		title: 'Company',
		links: [
			{ path: '/about-us', label: 'About Us' },
			{ path: '/contact-us', label: 'Contact Us' },
		],
	},
];

export const LANGUAGE_OPTIONS = ['English', 'Spanish'];

export const LEGAL_LINKS = [
	{ path: '/privacy', label: 'Privacy' },
	{ path: '/terms', label: 'Terms' },
];
