import React from 'react';

import JoinUsBox from './JoinUsBox';

import { peopleGroup1Img, peopleGroup2Img } from '@/assets';

const JoinUs = () => {
	return (
		<>
			<header className='p-10'>
				<h1 className='text-neutral-900 text-5xl font-bold text-center'>
					Join Us
				</h1>
				<JoinUsBox role='Trainer' image={peopleGroup1Img.src} />
				<JoinUsBox role='Student' image={peopleGroup2Img.src} />
			</header>
		</>
	);
};

export default JoinUs;
