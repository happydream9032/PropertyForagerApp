import { IAuthenticateResponse, IUser } from "@/types/user";
import {
  FORAGER_AGENCY_DATA,
  FORAGER_AUTH_DATA,
  FORAGER_USER_DATA,
} from "./constants";
import dayjs from "dayjs";
import { IAgency } from "@/types/agency";

export const getCookie = (cookieName: string) => {
  let cookieData: string = "";
  const decodedCookies = decodeURIComponent(document.cookie).split(";");
  decodedCookies.forEach((cookie) => {
    if (cookie.trimStart().startsWith(cookieName)) {
      cookieData = cookie.split("=")[1]; //get the cookie value
    }
  });
  return cookieData;
};

export const isOrdinaryUser = (authData: IAuthenticateResponse) => {
  return authData?.roles.includes("Tenant");
};

export const logout = () => {
  document.cookie = `${FORAGER_AUTH_DATA}=${JSON.stringify(
    {}
  )};expires=${dayjs().subtract(1, "second").toString()};`;
  localStorage.clear();
  window.location.href = "/";
};

export const setUser = (userData: IUser) => {
  localStorage.setItem(FORAGER_USER_DATA, JSON.stringify(userData));
};

export const getUser = () => {
  const user = localStorage.getItem(FORAGER_USER_DATA);
  if (user) {
    return JSON.parse(user) as IUser;
  }
  return null;
};

export const setAgency = (agencyData: IAgency) => {
  localStorage.setItem(FORAGER_AGENCY_DATA, JSON.stringify(agencyData));
};

export const getAgency = () => {
  const agency = localStorage.getItem(FORAGER_AGENCY_DATA);
  if (agency) {
    return JSON.parse(agency) as IAgency;
  }
  return null;
};
