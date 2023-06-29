import { IUser } from "./user";

export interface IAgency extends BaseType {
  id: string;
  agencyName?: string;
  city?: string;
  state?: string;
  street?: string;
  ownerId: string;
  owner: IUser;
}
