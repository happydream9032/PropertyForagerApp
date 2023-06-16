import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import About1 from "../../public/about1.png";
import About2 from "../../public/about2.png";
import About3 from "../../public/about3.png";
import About4 from "../../public/about4.png";
import About5 from "../../public/about5.png";
import { Button } from "@mui/material";

const StyledImage = styled(Image)(({ theme }) => ({
  width: "100%",
  height: "340px",
  color: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    height: "400px",
  },
}));

const StyledParagraph = styled("p")(() => ({
  marginLeft: 10,
}));

const StyledHeading = styled(Typography)(() => ({
  fontWeight: 500,
  marginLeft: 20,
  fontSize: 34,
  marginTop: 20,
}));
const StyledSubHeading = styled(Typography)(() => ({
  fontWeight: 400,
  marginLeft: 20,
  fontSize: 28,
}));

const About = () => {
  return (
    <Box sx={{ mt: 3 }} p={3}>
      <Grid container gap={1} px={4}>
        <StyledSubHeading>About us</StyledSubHeading>
        <Grid mb={2} item xs={12}>
          <StyledHeading>Our Story</StyledHeading>
          <StyledParagraph>
            Property Forager is a real estate business that manage, buy, sell,
            invest, and develop properties including land, residential homes,
            and other buildings. Our real estate company also offer services to
            help clients find the right property, negotiate prices, and manage
            the sale or lease process.
          </StyledParagraph>
          <StyledImage src={About1} alt="about-image" />
        </Grid>
        <Grid mb={2} item xs={12}>
          <StyledHeading>Why we founded Property Forager</StyledHeading>
          <StyledParagraph>
            Helping Investors Overseas & in Nigeria to Buy & Manage properties.
            Semi-detached Houses £99K. Fully renovated 2-bed & 3-bed houses with
            full long term management & Net Guaranteed Rent. Full Long Term
            Management. Watch BBC TV Episodes. Watch on testimonial page. Watch
            Our Property Video.
          </StyledParagraph>
          <StyledImage src={About2} alt="about-image" />
        </Grid>
        <Grid p={1} justifyContent="space-between" alignItems="center" container spacing={1}>
          <Grid p={8} xs={12} lg={4} md={6} item>
            <Box sx={{background:'yellow'}}>
              <StyledImage src={About3} alt="about image" />
              <StyledParagraph>Founder of Property Forager</StyledParagraph>
            </Box>
          </Grid>
          <Grid p={8} xs={12} lg={4} md={6} item>
          <Box sx={{background:'yellow'}}>
          <StyledImage src={About3} alt="about image" />
          <StyledParagraph>Real estate agent</StyledParagraph>
          </Box>
          </Grid>
          <Grid p={8} xs={12} lg={4} md={6} item>
          <Box sx={{background:'yellow'}}>
          <StyledImage src={About3} alt="about image" />
          <StyledParagraph>Real estate agent</StyledParagraph>
          </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
