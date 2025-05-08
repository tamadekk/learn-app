import Button from '@/shared/Button/Button';
import TrainersTable from './trainers-table';

const Trainers = () => {
	return (
		<div className='flex flex-col gap-10'>
			<div className='flex items-center justify-between gap-10'>
				<h2 className='text-xl font-semibold text-neutral-900 sm:text-[48px]'>
					My Trainers
				</h2>
				<Button className='bg-primary text-white'>Add Trainer</Button>
			</div>

			<TrainersTable />
		</div>
	);
};

export default Trainers;
