import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import BusinessIcon from "@mui/icons-material/Business";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallIcon from "@mui/icons-material/Call";
import TextFieldWithLabel from "../TextFields/TextFieldWithLabel";

const StyledHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  marginLeft: 50,
  fontSize: 34,
}));
const StyledSubHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  marginLeft: 26,
  fontSize: 28,
}));
const StyledParagraph = styled(Typography)(({ theme }) => ({
  fontWeight: 300,
  marginLeft: 26,
  // fontSize: 8
}));

const StyledTextArea = styled("textarea")(({ theme }) => ({
  resize: "none",
  height: "7rem",
  background: "rgb(245,245,245)",
  borderColor: "gray",
  borderRadius: "4px",
  fontSize: "16px",
  fontWeight: "lighter",
  fontFamily: 'sans-serif',
  padding: '1rem',
  "&:focus": {
    border: "1px solid blue",
    outline: "none",
  },
}));

const About = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Box>
        <StyledHeading variant="h2">Contact</StyledHeading>
      </Box>
      {/* <Toolbar sx={{height: '5rem'}} /> */}
      <Grid
        gap={1}
        container
        justifyContent="space-between"
        alignItems="center"
        my={4}
        px={{ xs: 2, sm: 3 }}
      >
        <Grid item py={3} xs={12} md={6}>
          <StyledSubHeading variant="h3">Reach us</StyledSubHeading>
          <StyledParagraph as="p">
            We are committed to answering what ever questions you want to ask.
            Reach out to us and we will answer you.
          </StyledParagraph>
          <Box sx={{ marginLeft: "26px" }}>
            <Box my={1} display={"flex"} p={2}>
              <BusinessIcon />
              <StyledParagraph>
                3880 Peter Obi Street Akeleje, Il 60606 Jagaban Emirate
              </StyledParagraph>
            </Box>
            <Box my={1} display={"flex"} p={2}>
              <MailOutlineIcon />
              <StyledParagraph>Company name here</StyledParagraph>
            </Box>
            <Box my={1} display={"flex"} p={2}>
              <CallIcon />
              <StyledParagraph>+234-485-3885</StyledParagraph>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={5.5}>
          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            component="form"
            p={2}
          >
            <TextFieldWithLabel
              fullWidth
              type="text"
              name="name"
              label="Name"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
            <TextFieldWithLabel
              fullWidth
              type="email"
              name="email"
              label="Enter your email"              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
            <TextFieldWithLabel
              fullWidth
              type="text"
              name="phone"
              label="Enter your phone number"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
            <StyledTextArea name="message" placeholder="How can we help you?" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
