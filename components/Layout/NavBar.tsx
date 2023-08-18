import { theme } from "@/styles/theme";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import Logo from "./Logo";
import Avatar from "@mui/material/Avatar";
import GenericPopover from "../Shared/GenericPopover";
import { getUser, isOrdinaryUser, logout } from "@/utils/functions";
import { INavBarProps } from "@/types/navigation";
import { IUser } from "@/types/user";

const NavBar: FC<INavBarProps> = ({
  authNavItems,
  handleDrawerToggle,
  navItems,
  navButtonTextColor,
  authData,
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setUser(getUser());
  }, []);

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
            {!Boolean(authData) &&
              authNavItems.map((link, i) =>
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
          <IconButton
            onClick={handleClick}
            sx={{
              display: { xs: "none", md: authData ? "flex" : "none" },
              flexDirection: "column",
              gap: 0,
              position: "relative",
              border: "none",
              outline: "none",
              backgroundColor: "inherit",
            }}
          >
            <Avatar src={user?.avatarUrl} />
            <ArrowDropDownIcon
              sx={{
                width: "2.5rem",
                height: "2.5rem",
                position: "absolute",
                top: "60%",
                color: "GrayText",
              }}
            />
          </IconButton>
          {authData && (
            <GenericPopover
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <Box py={2} px={1} gap={1} display="flex" flexDirection="column">
                <PrimaryButton
                  sx={{
                    textTransform: "none",
                    backgroundColor: "GrayText",
                  }}
                  disableElevation
                  variant="contained"
                  size="small"
                >
                  <Link
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                    color="inherit"
                    href={
                      isOrdinaryUser(authData)
                        ? `/${authData.id}`
                        : "/backoffice"
                    }
                  >
                    {isOrdinaryUser(authData) ? "Profile" : "Dashboard"}
                  </Link>
                </PrimaryButton>
                <PrimaryButton
                  size="small"
                  sx={{ textTransform: "none", backgroundColor: "GrayText" }}
                  disableElevation
                  variant="contained"
                  onClick={logout}
                >
                  Log out
                </PrimaryButton>
              </Box>
            </GenericPopover>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
