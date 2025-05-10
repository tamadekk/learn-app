import DataTable from 'react-data-table-component';
import { Trainer, TRAINERS_DATA } from '@/constants/trainers';
import { trainerTableStyles } from '@/constants/tableStyles';

const columns = [
	{
		name: 'Name',
		selector: (row: Trainer) => row.name,
	},
	{
		name: 'Specialization',
		selector: (row: Trainer) => row.specialization,
	},
];
const TrainersTable = () => {
	return (
		<DataTable columns={columns} data={TRAINERS_DATA} customStyles={trainerTableStyles} />
	);
};

export default TrainersTable;
