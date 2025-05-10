import DataTable from 'react-data-table-component';

const columns = [
	{
		name: 'Name',
		selector: (row: { name: string }) => row.name,
	},
	{
		name: 'Specialization',
		selector: (row: { specialization: string }) => row.specialization,
	},
];

const data = [
	{
		id: 1,
		name: 'Elizabeth Lopez',
		specialization: 'PHP',
	},
	{
		id: 2,
		name: 'John Doe',
		specialization: 'JavaScript',
	},
	{
		id: 3,
		name: 'Jane Doe',
		specialization: 'Algorithms',
	},
	{
		id: 4,
		name: 'John Doe',
		specialization: 'Java',
	},
];
const customStyles = {
	tableWrapper: {
		style: {
			border: '1px solid #EAEAEA',
			borderRadius: '6px',
			overflow: 'hidden',
		},
	},
	rows: {
		style: {
			minHeight: '72px',
			fontWeight: 'bold',
		},
	},
	headCells: {
		style: {
			paddingLeft: '8px',
			paddingRight: '8px',
			backgroundColor: '#EAEAEA',
			fontWeight: 'bold',
		},
	},
	cells: {
		style: {
			paddingLeft: '8px',
			paddingRight: '8px',
		},
	},
};
const TrainersTable = () => {
	return (
		<DataTable columns={columns} data={data} customStyles={customStyles} />
	);
};

export default TrainersTable;
