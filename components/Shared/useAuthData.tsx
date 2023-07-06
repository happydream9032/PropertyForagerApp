import { IAuthenticateResponse } from "@/types/user";
import { FORAGER_AUTH_DATA } from "@/utils/constants";
import { getCookie } from "@/utils/functions";
import { publicRoutes } from "@/utils/routes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const useAuthData = () => {
  const router = useRouter();
  const [authData, setAuthData] = useState<IAuthenticateResponse | null>(null);

  useEffect(() => {
    const cookieAuthData = getCookie(FORAGER_AUTH_DATA);
    if (!publicRoutes.includes(router.pathname)) {
      if (!cookieAuthData.length) {
        router.push("/login");
      } else {
        setAuthData(JSON.parse(cookieAuthData) as IAuthenticateResponse);
      }
    }
  }, []);

  return {
    authData,
  };
};

export default useAuthData;
