interface ProfileFieldProps {
	label: string;
	value: string | undefined;
}

const ProfileField = ({ label, value }: ProfileFieldProps) => {
	return (
		<li className='flex flex-col'>
			<span className='text-lg font-semibold text-neutral-900'>{label}</span>
			<span className='text-sm sm:text-xl'>{value}</span>
		</li>
	);
};

export default ProfileField;
