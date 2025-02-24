import React, { ButtonHTMLAttributes } from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva('text-white rounded-md disabled:opacity-40', {
	variants: {
		variant: {
			primeButton: 'bg-primary-500 hover:bg-primary-550 focus:bg-primary-600',
			secondaryButton:
				'bg-tertiary3-500 hover:bg-tertiary3-600 focus:bg-tertiary3-650',
			importantButton: 'bg-danger-500 hover:bg-danger-600 focus:bg-danger-650',
			outline:
				'bg-transparent text-primary-500 border border-primary-500 hover:font-medium focus:font-semibold',

			icon: '',
		},
		size: {
			default: 'w-auto px-4 h-10',
			large: 'w-full h-10',
		},
	},
	defaultVariants: {
		variant: 'primeButton',
		size: 'default',
	},
});

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	message?: string;
	children?: React.ReactNode;
}

const Button = ({ className, size, variant, ...props }: ButtonProps) => {
	return (
		<button
			className={cn(buttonVariants({ variant, size, className }))}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			{props.children}
			{props.message}
		</button>
	);
};

export default Button;
