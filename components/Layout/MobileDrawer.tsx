import { theme } from "@/styles/theme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { FC } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";

const MobileDrawer: FC<IMobileDrawerProps> = ({
  authNavItems,
  drawerWidth,
  handleDrawerToggle,
  mobileOpen,
  navItems,
  navButtonTextColor,
}) => {
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "inherit",
        py: 4,
      }}
    >
      <List >
        {navItems.map((item, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link style={{color: 'inherit', textDecoration:'none', width: '100%'}} href={item.href}>
              <ListItemText primary={item.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box
        display="flex"
        alignItems="center"
        flexDirection="column-reverse"
        padding={2}
        gap={2}
      >
        {authNavItems.map((link, i) =>
          link.name === "Log in" ? (
            <Button
              fullWidth
              disableElevation
              variant="contained"
              sx={{
                color: navButtonTextColor,
                textTransform: "none",
                backgroundColor: "rgba(64,87,109,.07)",
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
              fullWidth
              sx={{ textTransform: "none", px: "0.5rem" }}
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
    </Box>
  );

  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { xs: drawerWidth, sm: 300 },
          },
          "& .MuiBox-root": {
            height: "100%",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default MobileDrawer;
