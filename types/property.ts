import { IAgency } from "./agency";
import { IUser } from "./user";

export enum PropertyStatus {
  Published,
  Draft,
}

export enum PropertyAvailability {
  Available,
  Rented,
}

export enum PropertyType {
  Flat,
  House,
}

export enum PropertyPriceType {
  PerAnnum,
  PerMonth,
}

interface IPropertyImage extends BaseType {
  id: string;
  imageURL: string;
  verified: boolean;
}

export interface IProperty extends BaseType {
  id: string;
  title: string;
  description?: string;
  locality: string;
  street: string;
  status: PropertyStatus;
  availability: PropertyAvailability;
  propertyType: PropertyType;
  price: number;
  priceType: PropertyPriceType;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  numberOfToilets: number;
  parkingSpace?: number;
  totalLandArea?: number;
  furnished?: boolean;
  serviced?: boolean;
  shared?: boolean;
  images: IPropertyImage[];
  ownerId?: string;
  owner?: IUser;
  agencyId?: string;
  agency?: IAgency;
  publishedDate?: Date;
}

export type PropertyOverview = Pick<
  IProperty,
  | "id"
  | "title"
  | "description"
  | "numberOfBathrooms"
  | "numberOfBedrooms"
  | "totalLandArea"
  | "images"
  | "price"
  | "priceType"
  | "street"
  | "locality"
>;

export type PropertiesList = PropertyOverview[];

export type PropertiesListParams = {
  pageNumber: number;
  pageSize: number;
  searchKeyword: string;
  propertyType: PropertyType;
  maximumPrice: number;
  minimumPrice: number;
  priceType: PropertyPriceType;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  numberOfToilets: number;
  maximumParkingSpace: number;
  minimumParkingSpace: number;
  furnished: boolean;
  serviced: boolean;
  shared: boolean;
  ownerId: string;
  agencyId: string;
};

export type ListPropertiesRequest = Partial<PropertiesListParams>;
