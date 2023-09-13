import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Head from "next/head";
import MobileDrawer from "./MobileDrawer";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import useAuthData from "../Shared/useAuthData";
import { _getAgency, _getCurrentUser } from "@/services/userService";
import { getUser, setAgency, setUser } from "@/utils/functions";
import { IAgency } from "@/types/agency";
import { NavItem } from "@/types/navigation";

const drawerWidth = 240;
const navItems: NavItem[] = [
  { name: "Home", authRequired: false, href: "/" },
  { name: "About", authRequired: false, href: "/about" },
  { name: "Properties", authRequired: false, href: "/properties" },
  { name: "Requests", authRequired: true, href: "/requests" },
  { name: "Contact", authRequired: false, href: "/contact" },
];

const navButtonTextColor = "#212121";

const authNavItems: NavItem[] = [
  { name: "Log in", authRequired: false, href: "/login" },
  { name: "Sign up", authRequired: false, href: "/signup" },
];

interface IProps extends React.PropsWithChildren {
  pageTitle: string;
}

export default function Layout({ children, pageTitle }: IProps) {
  const router = useRouter();
  const { authData } = useAuthData();
  // const routechangeEvent = new Cust

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  React.useEffect(() => {
    if (authData && !getUser()) {
      (async () => {
        try {
          if (authData.roles.includes("Agency")) {
            const response = await _getAgency(authData.token);
            const agencyData = response.data as IAgency;
            setAgency(agencyData);
            setUser(agencyData.owner);
          } else {
            const response = await _getCurrentUser(authData.token);
            const userData = response.data;
            setUser(userData);
          }
          router.reload();
        } catch (error) {
          router.reload();
        }
      })();
    }
  }, [authData, router]);

  return (
    <>
      <Head>
        <title>{`${pageTitle} | Property Forager`}</title>
        <meta
          name="description"
          content="Find your ideal home with Property Forager"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ height: "fit-content" }}>
        <CssBaseline />
        <NavBar
          navItems={navItems}
          navButtonTextColor={navButtonTextColor}
          handleDrawerToggle={handleDrawerToggle}
          authNavItems={authNavItems}
          authData={authData}
        />

        <MobileDrawer
          navItems={navItems}
          navButtonTextColor={navButtonTextColor}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          authNavItems={authNavItems}
          drawerWidth={drawerWidth}
          authData={authData}
        />
        <Box component="main">
          <Toolbar sx={{ height: "4rem" }} />
          {children}
        </Box>

        {router.pathname !== "/login" && router.pathname !== "/signup" && (
          <Footer navItems={navItems} />
        )}
      </Box>
    </>
  );
}
