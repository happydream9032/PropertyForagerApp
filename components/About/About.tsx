import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import About1 from "../../public/about_us.jpeg";
import About2 from "../../public/about_us2.avif";
import Engineer from "../../public/Engineer.jpeg";
import Owner from "../../public/Owner.png";

const StyledImage = styled(Image)(({ theme }) => ({
  width: "100%",
  height: "500px",
  color: theme.palette.primary.main,
  [theme.breakpoints.down("lg")]: {
    height: "400px",
  },
  [theme.breakpoints.down("md")]: {
    height: "300px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "200px",
  },
}));

const StyledParagraph = styled("p")(() => ({
  marginLeft: 10,
}));

const StyledHeading = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: 34,
  marginTop: 20,
  textAlign: "center",
}));

const About = () => {
  return (
    <Box sx={{ mt: 3, px: { xs: 3, sm: 5, md: 6 } }}>
      <Grid container gap={1} px={4}>
        <Grid mb={2} item xs={12}>
          <StyledHeading>Our Story</StyledHeading>
          <StyledParagraph>
            Property Forager is a real estate business that manage, buy, sell,
            invest, and develop properties including land, residential homes,
            and other buildings. Our real estate company also offer services to
            help clients find the right property, negotiate prices, and manage
            the sale or lease process.
          </StyledParagraph>
          <StyledImage
            sx={{ objectFit: "fill" }}
            src={About1}
            alt="about-image"
          />
        </Grid>
        <Grid mb={2} item xs={12}>
          <StyledHeading>Why we founded Property Forager</StyledHeading>
          <StyledParagraph>
            Helping people in Nigeria to rent & manage properties. Fully
            renovated 2-bed, 3-bed & 4-bed houses with full long term management
            & Net Guaranteed Rent. Full Long Term Management. Watch BBC TV
            Episodes. Watch on testimonial page. Watch Our Property Video.
          </StyledParagraph>
          <StyledImage src={About2} alt="about-image" />
        </Grid>
      </Grid>
      <Box display="flex" py={2} flexDirection="column" gap={2}>
        <StyledHeading>Meet The Team</StyledHeading>
        <Grid
          px={4}
          sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          container
          spacing={2}
        >
          <Grid xs={12} sm={6} item>
            <Box sx={{}}>
              <StyledImage
                sx={{
                  objectFit: "contain",
                  borderRadius: "2rem",
                }}
                src={Owner}
                alt="Owner of Property Forager"
              />
              <Box textAlign="center">
                <Typography fontWeight={600}>Mr. Chibuzor Fidelis</Typography>
                <Typography>Owner of Property Forager</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={6} item>
            <Box sx={{}}>
              <StyledImage
                sx={{
                  objectFit: "contain",
                  borderRadius: "2rem",
                }}
                src={Engineer}
                alt="Software Architect"
              />
              <Box textAlign="center">
                <Typography fontWeight={600}>Engr. Chukwuka Emi</Typography>
                <Typography>Software Architect, Property Forager</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
