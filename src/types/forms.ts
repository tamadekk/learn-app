export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  password: string;
}

export type FormValues =
  | LoginFormValues
  | RegistrationFormValues
  | Record<string, any>;
