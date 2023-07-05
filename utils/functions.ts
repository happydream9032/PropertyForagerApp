import { IAuthenticateResponse } from "@/types/user";
import { FORAGER_AUTH_DATA } from "./constants";
import dayjs from "dayjs";

export const getCookie = (cookieName: string) => {
  let cookieData: string = "";
  const decodedCookies = decodeURIComponent(document.cookie).split(";");
  decodedCookies.forEach((cookie) => {
    if (cookie.startsWith(cookieName)) {
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

  window.location.href = "/";
};
