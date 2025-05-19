import React from 'react';
import { UseFormRegister, Path } from 'react-hook-form';

type SelectorProps<
	TFormValues extends Record<string, any> = Record<string, any>,
> = {
	name: Path<TFormValues>;
	className?: string;
	value?: string;
	required?: boolean;
	options: string[];
	register: UseFormRegister<TFormValues>;
};
const Selector = <
	TFormValues extends Record<string, any> = Record<string, any>,
>(
	props: SelectorProps<TFormValues>
) => {
	return (
		<select
			{...props.register(props.name)}
			name={props.name}
			className={`bg-transparent border border-gray-300 p-2 rounded-md text-sm ${props.className}`}
			required={props.required}
		>
			<option value=''>Please select</option>
			{props.options.map((option, index) => (
				<option className='bg-white  rounded-m ' key={index} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};

export default Selector;
