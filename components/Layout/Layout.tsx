import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Head from "next/head";
import MobileDrawer from "./MobileDrawer";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useRouter } from "next/router";

const drawerWidth = 240;
const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Properties", href: "/properties" },
  { name: "Contact", href: "/contact" },
];

const navButtonTextColor = "#212121";

const authNavItems = [
  { name: "Log in", href: "/login" },
  { name: "Sign up", href: "/signup" },
];

interface IProps extends React.PropsWithChildren {
  pageTitle: string;
}

export default function Layout({ children, pageTitle }: IProps) {
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

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
        />

        <MobileDrawer
          navItems={navItems}
          navButtonTextColor={navButtonTextColor}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          authNavItems={authNavItems}
          drawerWidth={drawerWidth}
        />
        <Box component="main" >
          <Toolbar sx={{ height: "6rem" }} />
          {children}
        </Box>

        {router.pathname !== "/login" && router.pathname !== "/signup" && (
          <Footer navItems={navItems} />
        )}
      </Box>
    </>
  );
}
