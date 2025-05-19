import Button from '@/ui/Button/Button';
import TrainersTable from './trainers-table';

const Trainers = () => {
	return (
		<div className='flex flex-col gap-6 sm:gap-8 md:gap-10'>
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 md:gap-10'>
				<h2 className='text-2xl font-semibold text-neutral-900 sm:text-3xl md:text-[48px]'>
					My Trainers
				</h2>
				<Button className='bg-primary text-white self-start sm:self-auto'>
					Add Trainer
				</Button>
			</div>

			<div className='overflow-x-auto'>
				<TrainersTable />
			</div>
		</div>
	);
};

export default Trainers;
