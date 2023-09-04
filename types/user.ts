export enum RoleType {
  Tenant,
  Agency,
  PropertyOwner,
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Others = "Others",
}

export const GenderMap = {
  Male: 0,
  Female: 1,
  Others: 2,
};

export enum EmploymentStatus {
  Employed = "Employed",
  SelfEmployed = "Self employed",
  Student = "Student",
  UnEmployed = "Unemployed",
}

export const EmploymentStatusMap = {
  Employed: 0,
  SelfEmployed: 1,
  Student: 2,
  UnEmployed: 3,
};

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
  gender: Gender | null;
  employmentStatus: EmploymentStatus | null;
  avatarUrl: string;
  imageFileId: string;
  profileCompletionPercentage: number;
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

export interface UserProfileUpdateRequest {
  firstName: string;
  lastName: string;
  city: string | null;
  state: string | null;
  gender: Gender | null;
  employmentStatus: EmploymentStatus | null;
  allowNewPropertyNotifications: boolean;
  allowRentDueNotifications: boolean;
  allowRentPaymentNotifications: boolean;
}

export type ResetPasswordRequest = {
  email: string;
  token: string;
  newPassword: string;
};

export type ChangePasswordRequest = {
  email: string;
  currentPassword: string;
  newPassword: string;
};
