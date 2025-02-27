export type LoginFormValues = {
	username: string;
	password: string;
};

export type RegistrationFormValues = {
	firstName: string;
	lastName: string;
	email: string;
	specialization: string;
};

export type FormValues =
	| LoginFormValues
	| RegistrationFormValues
	| Record<string, any>;
