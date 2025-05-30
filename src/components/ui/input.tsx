import React, { InputHTMLAttributes } from 'react';
import Image from 'next/image';
import {
	UseFormRegister,
	Path,
	RegisterOptions,
	FieldError,
} from 'react-hook-form';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
	'ps-10 p-2.5 pl-3 bg-neutral-150 text-sm outline-none border-neutral-400 rounded-md hover:border-primary-550 focus:border-primary-550',
	{
		variants: {
			variant: {
				default: '',
				withIcon: 'bg-neutral-200 pl-10',
				withIconTransparent: 'bg-transparent pl-10 border',
				transparent: 'focus:bg-neutral-150 border',
			},
			size: {
				default: 'w-full',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

interface InputProps<
	TFormValues extends Record<string, any> = Record<string, any>,
> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof inputVariants> {
	icon?: string;
	type: string;
	label?: string;
	name: Path<TFormValues>;
	placeholder: string;
	required?: boolean;
	children?: React.ReactNode;
	register: UseFormRegister<TFormValues>;
	validation?: RegisterOptions<TFormValues>;
	error?: FieldError;
}

const Input = <TFormValues extends Record<string, any> = Record<string, any>>({
	className,
	size,
	variant,
	...props
}: InputProps<TFormValues>) => {
	return (
		<div className='relative flex items-center'>
			{props.icon && (
				<Image
					src={props.icon}
					alt={`${props.name} icon`}
					className='absolute left-3'
					width={20}
					height={20}
				/>
			)}
			<div className='w-full'>
				<label
					className={cn(
						'text-neutral-700 text-md font-bold',
						props.error && 'text-red-600'
					)}
				>
					{props.label}
				</label>
				<input
					type={props.type}
					{...props.register(props.name, props.validation)}
					name={props.name}
					placeholder={props.placeholder}
					required={props.required}
					className={cn(
						inputVariants({ variant, size, className }),
						props.error && 'border-danger-500'
					)}
				/>
			</div>
			{props.children}
		</div>
	);
};

export default Input;
