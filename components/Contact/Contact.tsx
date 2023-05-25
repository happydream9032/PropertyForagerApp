import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import TextFieldWithLabel from "../TextFields/TextFieldWithLabel";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import customerService from "../../public/contact_service.png";
import { Button } from "@mui/material";


const StyledImage = styled(Image)(({ theme }) => ({
  width: "100%",
  height: "600px",
  color: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    height: "400px",
  },
}));

const StyledButton = styled(Button)(()=> ({
  background: '#8D49F1',
  color: 'white',
  width: '100px',
  borderRadius: '43px',
  "&:hover": {
    background: '#7320ee',
  }
}))


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

const StyledLabel = styled("label")(()=>({
  color: 'black',
  margin: 0,
  fontWeight: 500
}))

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
        <Grid item xs={12} p={2} >
          <Box>
            <Typography sx={{fontWeight: '500', fontSize: 43}}>Get in touch</Typography>
            <Typography>Our support team and Agents are always available to attend to you and answer your questions.</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} p={1} >
          <Box>
            <StyledImage src={customerService} alt="Customer service image" />
          </Box>
          <Box py={2}>
            <StyledParagraph>Our support team and Agents are always available to attend toyou and answer your questions.</StyledParagraph>
          </Box>
        </Grid>
        <Grid item py={3} my={5} xs={12} md={6} sx={{background: '#D9D9D9', borderRadius: 5}}>
          <Box sx={{ }}>
            <Box my={1} display={"flex"} p={2}>
              <LocationOnIcon />
              <StyledParagraph>
              37 Broad Street, Marina, Lagos state.
              </StyledParagraph>
            </Box>
            <Box my={1} display={"flex"} p={2}>
              <MailOutlineIcon />
              <StyledParagraph>propertyforager37@gmail.com </StyledParagraph>
            </Box>
            <Box my={1} display={"flex"} p={2}>
              <PhoneInTalkIcon />
              <StyledParagraph>255-564-1243</StyledParagraph>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <StyledSubHeading>Details Please</StyledSubHeading>
          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            component="form"
            p={2}
          >
            <StyledLabel>Name</StyledLabel>
            <TextFieldWithLabel
              fullWidth
              type="text"
              name="name"
              label="Name"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
            <StyledLabel>Email Address</StyledLabel>
            <TextFieldWithLabel
              fullWidth
              type="email"
              name="email"
              label="Enter your email"              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
            <StyledLabel>Phone</StyledLabel>
            <TextFieldWithLabel
              fullWidth
              type="text"
              name="phone"
              label="Enter your phone number"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
            <StyledLabel>Message</StyledLabel>
            <StyledTextArea name="message" placeholder="How can we help you?" />
            <StyledButton>Submit</StyledButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
