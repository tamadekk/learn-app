import Button from '@/ui/Button/Button';

const Trainings = () => {
	return (
		<section className='flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-24 justify-center items-center max-w-4xl mx-auto mt-8 sm:mt-[50px]'>
			<h2 className='text-2xl font-semibold text-neutral-900 sm:text-3xl md:text-[48px]'>
				My trainings
			</h2>
			<p className='text-neutral-900 text-center'>
				The Training Section is interactive, allowing you to engage with
				trainers and fellow learners, participate in quizzes, and track your
				progress. All our courses are flexible and adaptable to your schedule
				and learning speed.
			</p>
			<Button message='View Trainings' />
		</section>
	);
};

export default Trainings;
