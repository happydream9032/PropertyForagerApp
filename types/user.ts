export enum RoleType {
  Tenant,
  Agency,
  PropertyOwner,
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: boolean;
  userName: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  registrationDate: Date;
  allowNewPropertyNotifications: boolean;
  allowRentDueNotifications: boolean;
  allowRentPaymentNotifications: boolean;
  city: string | null;
  state: string | null;
  gender: string | null;
  employmentStatus: string | null;
  avatarUrl: string;
  imageFileId: string;
  profileCompletionPercentage: 50;
}

export interface IUserRegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  agencyCity?: string;
  agencyState?: string;
  agencyName?: string;
  roleType: RoleType;
}

export interface IAuthenticateResponse {
  id: string;
  email: string;
  userName: string;
  token: string;
  roles: string[];
}
