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
	rows: {
		style: {
			minHeight: '72px', // override the row height
		},
	},
	headCells: {
		style: {
			paddingLeft: '8px', // override the cell padding for head cells
			paddingRight: '8px',
		},
	},
	cells: {
		style: {
			paddingLeft: '8px', // override the cell padding for data cells
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
