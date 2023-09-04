import Box from "@mui/material/Box";
import React, { useState } from "react";
import TextFieldWithLabel from "../TextFields/TextFieldWithLabel";
import PrimaryButton from "../Buttons/PrimaryButton";
import CircularProgress from "@mui/material/CircularProgress";
import AlertComponent from "../Alerts/AlertComponent";
import { _forgetPassword } from "@/services/userService";
import Typography from "@mui/material/Typography";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState({
    success: false,
    message: "",
  });

  const handleSubmit = async () => {
    if (!email) {
      return setResponse({
        ...response,
        success: false,
        message: "Email address has not been provided",
      });
    }
    setIsProcessing(true);
    try {
      const res = await _forgetPassword(email);
      if (res.status !== 200) {
        return setResponse({
          ...response,
          success: false,
          message: res.data.Message,
        });
      }

      setResponse({ ...response, success: true, message: res.data.message });
    } catch (error) {
      console.log("Error reseting password", error);
      setResponse({
        ...response,
        success: false,
        message: "An error occured while sending request. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={2}
      component="form"
      sx={{
        py: 4,
        height: "20rem",
        width: { xs: "80%", sm: "60%", md: "50%", lg: "40%" },
        mx: "auto",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Typography
        sx={{ marginBottom: "2rem" }}
        textAlign="center"
        fontWeight={500}
        variant="h5"
      >
        Password Reset
      </Typography>
      <TextFieldWithLabel
        fullWidth
        type="email"
        name="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {response.message.trim().length > 0 && (
        <AlertComponent
          onClose={() => setResponse({ ...response, message: "" })}
          severity={response.success ? "success" : "error"}
          message={response.message}
        />
      )}
      <PrimaryButton
        size="large"
        fullWidth
        sx={{
          textTransform: "none",
          width: { xs: "100%", md: "100%" },
          borderRadius: "5px",
        }}
        type={"submit"}
        disableElevation
        variant="contained"
        disabled={!Boolean(email) || isProcessing}
      >
        {isProcessing ? <CircularProgress /> : "Reset"}
      </PrimaryButton>
    </Box>
  );
};

export default ForgotPassword;
