import React from 'react';

interface Mocked_Blogs {
	id: string;
	img: string;
	tag: string;
	title: string;
	date: string;
	duration: number;
}

interface BoxProps {
	blogs: Mocked_Blogs[];
}
const Box = (props: BoxProps) => {
	return (
		<>
			{props.blogs.map((item) => (
				<div className='flex flex-col max-w-96 border shadow-sm rounded-lg pb-6' key={item.id}>
					<img
						src={item.img.src}
						alt='Mocked Item'
						className='rounded-t-lg h-64 w-96 object-cover'
					/>
					<div className='px-6 mt-6'>
						<p className='text-primary-500'>{item.tag}</p>
						<h1 className='text-neutral-900 font-bold text-lg'>{item.title}</h1>
						<div className='flex justify-between mt-5'>
							<p className='text-neutral-500 text-sm'>{item.date}</p>
							<p className='text-neutral-500 border border-neutral-600 rounded-full px-2 text-sm'>
								{item.duration} mins read
							</p>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default Box;
