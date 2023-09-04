import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import TextFieldWithLabel from "../TextFields/TextFieldWithLabel";
import PrimaryButton from "../Buttons/PrimaryButton";
import CircularProgress from "@mui/material/CircularProgress";
import AlertComponent from "../Alerts/AlertComponent";
import {
  _changePassword,
  _forgetPassword,
  _resetPassword,
} from "@/services/userService";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useRouter } from "next/router";
import { IAuthenticateResponse } from "@/types/user";

type action = "reset" | "update";
interface IProps {
  action: "reset" | "update";
  resetToken?: string;
  authData?: IAuthenticateResponse | null;
}
const ResetPassword: FC<IProps> = ({ resetToken, action, authData }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState({
    success: false,
    message: "",
  });

  const handlePasswordReset = async () => {
    if (!resetToken) {
      return setResponse({
        success: false,
        message:
          "You don't have a password reset token. Go back to the forgot-password page and resend your request",
      });
    }

    if (!email || !newPassword) {
      return setResponse({
        success: false,
        message: "Please fill out all fields on the form",
      });
    }
    setIsProcessing(true);
    try {
      const res = await _resetPassword({
        email,
        newPassword,
        token: resetToken,
      });
      if (res.status !== 200) {
        return setResponse({ success: false, message: res.data.Message });
      }
      setResponse({ success: true, message: res.data.message });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setResponse({
        success: false,
        message:
          "We encountered an error while updating your password. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!authData) {
      return setResponse({
        success: false,
        message:
          "Invalid authentication data. Please refresh this page and try again",
      });
    }
    if (!currentPassword || !newPassword) {
      return setResponse({
        success: false,
        message:
          "Please enter your current password and the new password you want to set.",
      });
    }
    setIsProcessing(true);
    try {
      const res = await _changePassword(
        {
          currentPassword,
          email: authData.email,
          newPassword,
        },
        authData.token
      );
      if (res.status !== 200) {
        setResponse({ success: false, message: res.data.Message });
        if (res.status === 401) {
          setTimeout(() => {
            router.reload();
          }, 5000);
        }
        return;
      }
      setResponse({ success: true, message: res.data.message });
      router.reload();
    } catch (error) {
      setResponse({
        success: false,
        message:
          "We encountered an error while updating your password. Please try again.",
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
        py: action === "reset" ? 4 : 1,
        width: {
          xs: action === "reset" ? "80%" : "90%",
          sm: action === "reset" ? "60%" : "70%",
          md: action === "reset" ? "50%" : "60%",
          lg: action === "reset" ? "40%" : "50%",
        },
        mx: action === "reset" ? "auto" : "",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        if (action === "reset") {
          handlePasswordReset();
        } else {
          handlePasswordUpdate();
        }
      }}
    >
      {action === "reset" && (
        <Typography
          sx={{ marginBottom: "2rem" }}
          textAlign="center"
          fontWeight={500}
          variant="h5"
        >
          Password Reset
        </Typography>
      )}
      {action === "reset" && (
        <TextFieldWithLabel
          fullWidth
          type="email"
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}
      {action === "update" && (
        <TextFieldWithLabel
          fullWidth
          type={showCurrentPassword ? "text" : "password"}
          name="currentPassword"
          label="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() =>
                  setShowCurrentPassword(
                    (showCurrentPassword) => !showCurrentPassword
                  )
                }
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            ),
          }}
        />
      )}

      <TextFieldWithLabel
        fullWidth
        type={showPassword ? "text" : "password"}
        name="password"
        label={action === "reset" ? "Password" : "New Password"}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        helperText="The password must be a minimum of 8 characters in length and should include at least one special character."
        error={
          newPassword.trim().length < 8 ||
          /[$&+,:;=?@#|'<>.^*()%!-]/gm.test(newPassword) === false ||
          (confirmPassword.length > 0 && newPassword !== confirmPassword)
        }
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          ),
        }}
      />
      <TextFieldWithLabel
        fullWidth
        type={showConfirmPassword ? "text" : "password"}
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        error={
          confirmPassword.trim().length < 8 ||
          /[$&+,:;=?@#|'<>.^*()%!-]/gm.test(confirmPassword) === false ||
          confirmPassword !== newPassword
        }
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() =>
                setShowConfirmPassword(
                  (showConfirmPassword) => !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          ),
        }}
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
        disabled={
          (action === "reset" ? !Boolean(email) : !Boolean(currentPassword)) ||
          !Boolean(newPassword) ||
          !Boolean(confirmPassword) ||
          confirmPassword !== newPassword ||
          isProcessing
        }
      >
        {isProcessing ? (
          <CircularProgress />
        ) : action === "reset" ? (
          "Reset"
        ) : (
          "Update"
        )}
      </PrimaryButton>
    </Box>
  );
};

export default ResetPassword;
