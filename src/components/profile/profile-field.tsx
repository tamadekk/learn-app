import Input from '@/components/ui/input';
import { UseFormRegister } from 'react-hook-form';
import { UserProfile } from '@/types';

interface ProfileFieldProps {
	label: string;
	fieldKey: keyof UserProfile;
	value: string | undefined;
	isEditing: boolean;
	register?: UseFormRegister<UserProfile>;
	validation?: Record<string, any>;
	error?: Record<string, any>;
}

const ProfileField = ({
	label,
	fieldKey,
	value,
	isEditing,
	register,
	validation,
	error,
}: ProfileFieldProps) => {
	return isEditing ? (
		<li className='flex flex-col'>
			<span className='text-lg font-semibold text-neutral-900'>{label}</span>
			{register ? (
				<Input
					type='text'
					variant='transparent'
					className='bg-neutral-200'
					name={fieldKey}
					placeholder={value || 'Not set'}
					register={register}
					validation={validation}
					error={error?.[fieldKey]}
					required
				/>
			) : (
				<div className='bg-neutral-200 p-2.5 rounded-md'>
					{value || 'Not set'}
				</div>
			)}
			{error?.[fieldKey] && (
				<span className='text-xs text-danger-500 mt-1'>
					{error[fieldKey]?.message}
				</span>
			)}
		</li>
	) : (
		<li className='flex flex-col'>
			<span className='text-lg font-semibold text-neutral-900'>{label}</span>
			<span className='text-sm sm:text-xl'>{value || 'Not set'}</span>
		</li>
	);
};

export default ProfileField;
