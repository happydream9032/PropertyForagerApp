import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { theme } from "../styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { axiosInstance } from "../services/axiosConfig";
import { useEffect, useRef } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const setIntervalRef = useRef<NodeJS.Timer | null>(null);
  //function that pings the external backend api
  const pingApi = async () => {
    await axiosInstance.get(`/api/ping`);
  };

  //Invoke the above function every 10 minutes
  useEffect(() => {
    setIntervalRef.current = setInterval(pingApi, 600000);

    return () => {
      if (setIntervalRef.current) {
        clearInterval(setIntervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
