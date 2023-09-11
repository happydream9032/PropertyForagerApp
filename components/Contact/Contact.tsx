import React, { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import TextFieldWithLabel from "../TextFields/TextFieldWithLabel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import customerService from "../../public/contact_us.webp";
import PrimaryButton from "../Buttons/PrimaryButton";
import { ContactData } from "@/types/user";
import { _contactUs } from "@/services/userService";
import AlertComponent from "../Alerts/AlertComponent";

const StyledImage = styled(Image)(({ theme }) => ({
  width: "100%",
  height: "600px",
  color: theme.palette.primary.main,
  [theme.breakpoints.down("md")]: {
    height: "400px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "200px",
  },
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

const StyledLabel = styled("label")(() => ({
  color: "black",
  margin: 0,
  fontWeight: 500,
}));

const StyledTextArea = styled("textarea")(({ theme }) => ({
  resize: "none",
  height: "7rem",
  background: "rgb(245,245,245)",
  borderColor: "gray",
  borderRadius: "4px",
  fontSize: "16px",
  fontWeight: "lighter",
  fontFamily: "sans-serif",
  padding: "1rem",
  "&:focus": {
    border: "1px solid blue",
    outline: "none",
  },
}));

const Contact = () => {
  const [contactData, setContactData] = useState<ContactData>({
    email: "",
    message: "",
    name: "",
    phoneNumber: "",
  });

  const [response, setResponse] = useState({ message: "", success: false });
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const missingParameters = (
      Object.keys(contactData) as Array<keyof ContactData>
    )
      .filter(
        (key) =>
          contactData[key] === undefined ||
          contactData[key] === null ||
          !contactData[key].trim().length
      )
      .map((key) => key);

    if (missingParameters.length) {
      return setResponse({
        success: false,
        message: `The following parameters are required: ${missingParameters.join(
          ", "
        )}`,
      });
    }
    setIsSendingRequest(true);
    try {
      const res = await _contactUs(contactData);
      if (res.status !== 200) {
        return setResponse({
          success: false,
          message:
            "Sorry, an error was encountered while processing your request.",
        });
      }
      setResponse({ success: true, message: res.data.message });
      setContactData({ email: "", message: "", name: "", phoneNumber: "" });
    } catch (error) {
      setResponse({
        success: false,
        message:
          "Something went wrong while processing your request. Please try again.",
      });
    } finally {
      setIsSendingRequest(false);
    }
  };
  return (
    <Box sx={{ mt: 3, px: { xs: 3, sm: 5, md: 6 } }}>
      <Grid
        gap={1}
        container
        justifyContent="space-between"
        alignItems="center"
        my={4}
        px={{ xs: 2, sm: 3 }}
      >
        <Grid item xs={12} p={2}>
          <Box>
            <Typography sx={{ fontWeight: "500", fontSize: 43 }}>
              Get in touch
            </Typography>
            <Typography>
              Our support team and Agents are always available to attend to you
              and answer your questions.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} p={1}>
          <Box>
            <StyledImage
              sx={{ objectFit: { xs: "fill", sm: "cover", md: "cover" } }}
              src={customerService}
              alt="Customer service image"
            />
          </Box>
          <Box py={2}>
            <StyledParagraph>
              Our support team and Agents are always available to attend toyou
              and answer your questions.
            </StyledParagraph>
          </Box>
        </Grid>
        <Grid
          item
          py={3}
          my={5}
          xs={12}
          md={6}
          sx={{ background: "#D9D9D9", borderRadius: 5 }}
        >
          <Box>
            <Box my={1} display={"flex"} p={2}>
              <LocationOnIcon />
              <StyledParagraph>
                37 Broad Street, Marina, Lagos state.
              </StyledParagraph>
            </Box>
            <Box my={1} display={"flex"} p={2}>
              <MailOutlineIcon />
              <StyledParagraph>propertyforager@gmail.com</StyledParagraph>
            </Box>
            <Box my={1} display={"flex"} p={2}>
              <PhoneInTalkIcon />
              <StyledParagraph>255-564-1243</StyledParagraph>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <StyledSubHeading sx={{ marginLeft: "0px", mb: 2 }}>
            Details Please
          </StyledSubHeading>
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            sx={{ width: { sx: "100%", sm: "60%", lg: "40%" } }}
            component="form"
            onSubmit={handleSubmit}
          >
            <StyledLabel>Name</StyledLabel>
            <TextFieldWithLabel
              fullWidth
              type="text"
              name="name"
              label="Name"
              value={contactData.name}
              onChange={handleChange}
            />
            <StyledLabel>Email Address</StyledLabel>
            <TextFieldWithLabel
              fullWidth
              type="email"
              name="email"
              label="Enter your email"
              value={contactData.email}
              onChange={handleChange}
            />
            <StyledLabel>Phone</StyledLabel>
            <TextFieldWithLabel
              fullWidth
              type="text"
              name="phoneNumber"
              label="Enter your phone number"
              value={contactData.phoneNumber}
              onChange={handleChange}
            />
            <StyledLabel>Message</StyledLabel>
            <StyledTextArea
              name="message"
              placeholder="How can we help you?"
              value={contactData.message}
              onChange={handleChange}
            />
            {response.message.trim().length > 0 && (
              <AlertComponent
                message={response.message}
                onClose={() => setResponse({ ...response, message: "" })}
                severity={response.success ? "success" : "error"}
              />
            )}
            <PrimaryButton
              sx={{ textTransform: "none" }}
              disableElevation
              disableRipple
              disabled={
                !contactData.email ||
                !contactData.message ||
                !contactData.name ||
                !contactData.phoneNumber ||
                isSendingRequest
              }
              size="large"
              variant="contained"
              type="submit"
            >
              {isSendingRequest ? "Sending..." : "Submit"}
            </PrimaryButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
