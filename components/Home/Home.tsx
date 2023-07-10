import React, { FC } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Search from "./Search";
import Image from "next/image";
import sampleProperty from "../../public/prop.jpeg";
import LatestProperties from "./LatestProperties";

const StyledImage = styled(Image)(({ theme }) => ({
  width: "100%",
  height: "600px",
  color: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    height: "400px",
  },
}));

const StyledHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
}));

const Home: FC = () => {
  const theme = useTheme();
  return (
    <Box sx={{ pt: "4rem" }}>
      {/* FIRST SECTION */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={4}
        px={5}
      >
        <Grid item xs={12} md={6}>
          <Box>
            <StyledHeading variant="h2">
              Find your dream home with{" "}
              <span style={{ color: theme.palette.primary.main }}>
                Property Forager
              </span>
            </StyledHeading>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Search />
        </Grid>
      </Grid>
      {/* SAMPLE PROPERTY */}
      <Box sx={{ mt: 6 }}>
        <StyledImage src={sampleProperty} alt="Sample property" />
      </Box>
      <LatestProperties />
    </Box>
  );
};

export default Home;
