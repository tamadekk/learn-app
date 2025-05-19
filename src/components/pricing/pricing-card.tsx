import React from 'react';
import Image from 'next/image';
import { check, xmarkIcon } from '@/assets/index';

import clsx from 'clsx';
import Button from '@/components/ui/Button/Button';

type PricingType = {
	title: string;
	price: {
		price: number;
		plan: string;
	};
	description: string;
	features: {
		users: number;
		collaboration: boolean;
		smartAnalytics: boolean;
		freeTrial: boolean;
	};
	featured: boolean;
};

const FeatureList = ({ features }: { features: PricingType['features'] }) => {
	const featureItems = [
		{ label: `Up to ${features.users} users`, value: true },
		{ label: 'Collaboration features', value: features.collaboration },
		{ label: 'Smart analytics', value: features.smartAnalytics },
		{ label: 'Free trial', value: features.freeTrial },
	];
	return (
		<ul className='flex flex-col gap-[10px]'>
			{featureItems.map((item, index) => (
				<li key={index} className='flex gap-2'>
					{item.value ? (
						<Image src={check} alt='available' />
					) : (
						<Image src={xmarkIcon} alt='non-available' />
					)}
					{item.label}
				</li>
			))}
		</ul>
	);
};

const PricingCard = ({
	title,
	price,
	description,
	features,
	featured = false,
}: PricingType) => {
	return (
		<div className='inline-block'>
			<div
				className={clsx(
					'flex flex-col gap-4 h-[402px] w-[353px] p-6 bg-neutral-100 shadow-xs rounded-tl-md rounded-bl-md',
					featured && 'bg-white h-[439px]'
				)}
			>
				<div className='flex items-center justify-between'>
					<h2
						className={clsx(
							'text-[32px] text-neutral-900 font-bold',
							featured && 'text-primary-500'
						)}
					>
						{title}
					</h2>
					{featured && (
						<p className='bg-secondary-500 text-xs text-white font-poppins rounded-2xl p-2'>
							Popular
						</p>
					)}
				</div>

				<p className='text-[16px] text-neutral-600'>{description}</p>
				<p className='relative text-[40px] text-neutral-900 font-bold'>
					${price.price}
					<span className='absolute  text-neutral-600 text-sm font-normal'>
						{price.plan}
					</span>
				</p>
				<FeatureList features={features} />
				<Button
					message='Upgrade'
					variant={featured ? 'primeButton' : 'outline'}
				/>
			</div>
		</div>
	);
};

export default PricingCard;
