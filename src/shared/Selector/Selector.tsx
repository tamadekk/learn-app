import React from 'react';
import { UseFormRegister, Path } from 'react-hook-form';

import { IFormValues } from '../Input/types';

interface SelectorProps {
	name: Path<IFormValues>;
	className?: string;
	value?: string;
	required?: boolean;
	options: string[];
	register: UseFormRegister<IFormValues>;
}
const Selector = (props: SelectorProps) => {
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
