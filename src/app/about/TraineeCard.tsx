import React from 'react';

interface TraineeCardProps {
	name: string;
	title: string;
	description: string;
	image: string;
}

const TraineeCard = (props: TraineeCardProps) => {
	return (
		<>
			<div className='flex flex-col w-full text-center pt-6 pb-8 px-3 items-center bg-neutral-100 rounded-lg'>
				<img
					src={props.image}
					alt='Trainee portrait'
					className='h-44 w-44 rounded-[87px] border-solid border-white border-4 object-cover'
				/>
				<h3 className='text-neutral-900 font-bold'>{props.name}</h3>
				<h4 className='text-primary-500'>{props.title}</h4>
				<p className='text-neutral-600'>{props.description}</p>
			</div>
		</>
	);
};

export default TraineeCard;
