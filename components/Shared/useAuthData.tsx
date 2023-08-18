import { IAuthenticateResponse } from "@/types/user";
import { FORAGER_AUTH_DATA, PREVIOUS_ROUTE_QUERY_KEY } from "@/utils/constants";
import { getCookie } from "@/utils/functions";
import { publicRoutes } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useAuthData = () => {
  const router = useRouter();
  const [authData, setAuthData] = useState<IAuthenticateResponse | null>(null);

  useEffect(() => {
    const cookieAuthData = getCookie(FORAGER_AUTH_DATA);
    if (cookieAuthData.length) {
      setAuthData(JSON.parse(cookieAuthData) as IAuthenticateResponse);
    } else {
      if (!publicRoutes.includes(router.pathname)) {
        router.push(`/login?${PREVIOUS_ROUTE_QUERY_KEY}=${router.pathname}`);
      }
    }
  }, []);

  return {
    authData,
  };
};

export default useAuthData;
