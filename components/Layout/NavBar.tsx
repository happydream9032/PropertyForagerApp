import { theme } from "@/styles/theme";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import React, { FC, useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import Logo from "./Logo";
import { Avatar } from "@mui/material";

const NavBar: FC<INavBarProps> = ({
  authNavItems,
  handleDrawerToggle,
  navItems,
  navButtonTextColor,
}) => {
  const [user, setuser] = useState(null);

  return (
    <AppBar
      position="fixed"
      sx={{ py: 1, backgroundColor: "white", px: 3 }}
      elevation={1}
      component="nav"
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <IconButton
            color="success"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon sx={{ color: "#212121", fontSize: "2rem" }} />
          </IconButton>
          <Logo />
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {navItems.map((item, i) => (
            <Button
              key={i}
              sx={{
                color: navButtonTextColor,
                fontWeight: "500",
                letterSpacing: "2px",
                textTransform: "none",
              }}
            >
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                color="inherit"
                href={item.href}
              >
                {item.name}
              </Link>
            </Button>
          ))}
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Box sx={{ display: { xs: "none", sm: "flex" } }} gap={2}>
            {authNavItems.map((link, i) =>
              link.name === "Log in" ? (
                <Button
                  disableElevation
                  variant="contained"
                  sx={{
                    color: navButtonTextColor,
                    textTransform: "none",
                    backgroundColor: "rgba(64,87,109,.07)",
                    width: "5rem",
                    px: "0.5rem",
                    ":hover": {
                      backgroundColor: theme.palette.secondary.main,
                    },
                  }}
                  key={i}
                >
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    color="inherit"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </Button>
              ) : (
                <PrimaryButton
                  sx={{ textTransform: "none", width: "5rem", px: "0.5rem" }}
                  disableElevation
                  variant="contained"
                  key={i}
                >
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    color="inherit"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </PrimaryButton>
              )
            )}
          </Box>
          <Avatar sx={{ display: user ? "block" : "none" }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
