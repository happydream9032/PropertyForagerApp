import React, { FC } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DocumentIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import CustomLinkComponent from "../CustomLinkComponent";
import { useTheme } from "@mui/material/styles";
import useAuthData from "../Shared/useAuthData";
import Chip from "@mui/material/Chip";

const Dashboard: FC = () => {
  const theme = useTheme();

  const { authData } = useAuthData();

  const dashboardRoutes = [
    {
      route: "/backoffice/properties",
      title: "My Properties",
      description: "Add,edit and delete your properties",
      icon: (
        <ApartmentIcon
          sx={{ width: "4rem", height: "4rem", color: "GrayText" }}
        />
      ),
      available: true,
    },
    {
      route: `/${authData?.userName.split("@")[0]}?pId=${authData?.id}`,
      title: "My Profile",
      description: "Personal information, company details, settings",
      icon: (
        <PersonIcon sx={{ width: "4rem", height: "4rem", color: "GrayText" }} />
      ),
      available: true,
    },
    {
      route: "/dashboard/documents",
      title: "My Documents",
      description: "Create tenancy agreements, and manage documents",
      icon: (
        <DocumentIcon
          sx={{ width: "4rem", height: "4rem", color: "GrayText" }}
        />
      ),
      available: false,
    },
  ];

  return (
    <Box sx={{ pt: 6, pb: 6 }}>
      <Grid
        spacing={2}
        container
        sx={{
          width: "100%",
          px: 5,
          alignItems: "center",
          mx: "auto",
          justifyContent: "space-around",
        }}
      >
        {dashboardRoutes.map((dashboardRoute, index) => (
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
            key={index}
            item
            xs={12}
            sm={6}
            lg={4}
          >
            {!dashboardRoute.available && (
              <Chip
                color="secondary"
                label="Coming soon..."
                size="small"
                sx={{
                  fontWeight: 600,
                  position: "absolute",
                  top: 20,
                  left: 20,
                  zIndex: 9,
                }}
              />
            )}
            <Button
              variant="contained"
              disabled={!dashboardRoute.available}
              disableElevation
              disableRipple
              disableTouchRipple
              sx={{
                height: "15rem",
                color: "white",
                backgroundColor: "white",
                width: "100%",
                border: "1px solid grey",
                textTransform: "none",
                ":hover": {
                  border: "none",
                  backgroundColor: theme.palette.primary.main,
                  "& .MuiTypography-root": {
                    color: "white",
                  },
                  svg: {
                    color: "white",
                  },
                },
              }}
            >
              <CustomLinkComponent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "GrayText",
                  width: "100%",
                  // position: "relative",
                }}
                href={dashboardRoute.route}
              >
                <Box sx={{ width: "fit-content" }}>{dashboardRoute.icon}</Box>
                <Typography
                  fontWeight={500}
                  sx={{
                    fontSize: "1.2rem",
                    color: "",
                  }}
                >
                  {dashboardRoute.title}
                </Typography>
                <Typography sx={{ width: "fit-content" }}>
                  {dashboardRoute.description}
                </Typography>
              </CustomLinkComponent>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
