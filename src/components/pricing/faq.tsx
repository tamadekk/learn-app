'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { arrowDownward, arrowUpward } from '@/assets';

type FAQDataProps = {
	title: string;
	content: string;
	index: number;
};
const FAQ = ({ title, content, index }: FAQDataProps) => {
	const [expanded, setExpanded] = useState<number | null>(null);

	const toggleExpand = (index: number) => {
		setExpanded(expanded === index ? null : index);
	};

	return (
		<div
			onClick={() => toggleExpand(index)}
			className='p-5 cursor-pointer border-t border-neutral-300'
		>
			<div className='flex justify-between items-center'>
				<h3 className='text-[20px] text-neutral-900 font-bold'>{title}</h3>
				<span>
					{expanded === index ? (
						<Image
							className='bg-neutral-200 rounded-md'
							src={arrowUpward}
							alt='collapse'
						/>
					) : (
						<Image src={arrowDownward} alt='reveal' />
					)}
				</span>
			</div>
			{expanded === index && (
				<p className='text-[17px] text-neutral-700'>{content}</p>
			)}
		</div>
	);
};

export default FAQ;
