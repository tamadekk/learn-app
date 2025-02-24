import PricingCards from '@/components/pricing/pricing-card';
import FAQ from '@/components/pricing/faq';
import { PRICING_PLANS } from '@/constants/pricing/pricing';
import { FAQ_DATA } from '@/constants/pricing/pricing';

const Pricing = () => {
	return (
		<div className='min-h-screen max-w-7xl mx-auto px-5 mt-[50px]'>
			<div className='text-center'>
				<h1 className='text-5xl font-bold text-neutral-900 sm:text-[56px]'>
					Pricing
				</h1>
				<p className='text-lg text-neutral-500 mt-[20px] sm:mt-[50px] sm:text-xl'>
					At Learn Platform, we believe in providing high-quality education
					that's accessible and affordable. We offer diverse pricing plans
					designed to cater to individual learners, groups, and organizations.
					Let's explore each option below:
				</p>
			</div>
			<div className='flex flex-col gap-2 justify-center items-center mt-[50px] lg:flex-row lg:gap-0'>
				{PRICING_PLANS.map((item, index) => (
					<PricingCards
						key={index}
						title={item.TITLE}
						price={item.PRICE}
						description={item.DESCRIPTION}
						features={item.FEATURES}
						featured={index === 1}
					/>
				))}
			</div>
			<div className='mt-[46px] mb-14'>
				<div className='text-center'>
					<h2 className='text-5xl text-neutral-900 font-bold'>
						Frequently asked questions
					</h2>
					<p className='text-lg text-neutral-500 mt-5'>
						Exercitation dolore reprehenderit fugi
					</p>
				</div>
			</div>
			{FAQ_DATA.map((faq, index) => (
				<FAQ index={index} title={faq.title} content={faq.content} />
			))}
		</div>
	);
};

export default Pricing;
