export interface UserProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  specialization?: string;
  address?: string;
  email?: string;
  uid?: string;
  photoURL?: string;
  status?: string;
}

export interface ProfileField {
  label: string;
  key: keyof UserProfile;
  hidden?: boolean;
}
