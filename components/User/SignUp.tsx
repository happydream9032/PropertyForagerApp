import React, { ChangeEvent, FC, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SimpleDialog from "../Modals/SimpleDialog";
import TextFieldWithLabel from "../TextFields/TextFieldWithLabel";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOffOutlined";
import PrimaryButton from "../Buttons/PrimaryButton";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import { IUserRegistrationRequest, RoleType } from "@/types/user";
import Link from "next/link";
import { getSignUpValidationSchema } from "@/utils/validationSchema";
import { _registerUser } from "@/services/userService";
import AlertComponent from "../Alerts/AlertComponent";

interface IProps {
  openSignupForm: boolean;
  handleClose: () => void;
}

const intialState: IUserRegistrationRequest = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  roleType: RoleType.Tenant,
  agencyCity: "",
  agencyName: "",
  agencyState: "",
};

const SignUp: FC<IProps> = ({ openSignupForm = false, handleClose }) => {
  const theme = useTheme();
  const [stage, setStage] = useState(1);

  const [signupState, setSignUpState] =
    useState<IUserRegistrationRequest>(intialState);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [response, setResponse] = useState({
    error: false,
    success: false,
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpState({ ...signupState, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const schema = getSignUpValidationSchema(signupState);
    schema
      .validate(signupState)
      .then(async (validInputs) => {
        setIsRegistering(true);
        try {
          const res = await _registerUser(validInputs);
          setIsRegistering(false);
          if (res.status !== 200 && res.status !== 201) {
            setResponse({
              ...response,
              error: true,
              message: res.data.Message,
            });
            return;
          }
          setResponse({
            ...response,
            success: true,
            message: `${res.data.message}. A confirmation link has been sent to your email.Please check and confirm your email to continue.`,
          });
          return;
        } catch (error) {
          setIsRegistering(false);
          setResponse({
            ...response,
            error: true,
            success: false,
            message: "Something went wrong on our end. Please try again.",
          });
        }
      })
      .catch((error) => {
        setResponse({
          ...response,
          error: true,
          success: false,
          message: error.message,
        });
      });
  };

  const handleStage = async () => {
    if (stage === 1) {
      const stageOnePayload = {
        firstName: signupState.firstName,
        lastName: signupState.lastName,
        email: signupState.email,
        phoneNumber: signupState.phoneNumber,
        password: signupState.password,
        roleType: 0,
      };
      const schema = getSignUpValidationSchema(stageOnePayload);

      if (await schema.isValid(stageOnePayload)) {
        return setStage((stage) => stage + 1);
      }

      return setResponse({
        error: true,
        message:
          "You have not entered some fields correctly. Check your inputs and try again.",
        success: false,
      });
    }
  };

  return (
    <SimpleDialog
      maxWidth="md"
      fullWidth={true}
      sx={{ width: { xs: "95%", sm: "60%", md: "50%", lg: "40%" }, mx: "auto" }}
      handleClose={handleClose}
      open={openSignupForm}
      modalTitle="Create your account"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        component="form"
        sx={{ py: 2 }}
        noValidate={false}
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        {stage === 1 && (
          <Box display="flex" flexDirection="column" gap={1}>
            <TextFieldWithLabel
              fullWidth
              type="text"
              name="firstName"
              label="First Name"
              value={signupState.firstName}
              onChange={handleChange}
              error={signupState.firstName.trim().length === 0}
              helperText={""}
              required
            />
            <TextFieldWithLabel
              fullWidth
              type="text"
              name="lastName"
              label="Last Name"
              value={signupState.lastName}
              onChange={handleChange}
              error={signupState.lastName.trim().length === 0}
              required
            />
            <TextFieldWithLabel
              fullWidth
              type="email"
              name="email"
              label="Email"
              value={signupState.email}
              onChange={handleChange}
              error={signupState.email.trim().length === 0}
              required
            />
            <TextFieldWithLabel
              fullWidth
              type="tel"
              name="phoneNumber"
              label="Phone Number"
              helperText="format:234xxxx"
              value={signupState.phoneNumber}
              onChange={handleChange}
              error={
                signupState.phoneNumber.length === 0 ||
                !signupState.phoneNumber.startsWith("234")
              }
              required
            />
            <TextFieldWithLabel
              fullWidth
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              value={signupState.password}
              onChange={handleChange}
              required
              helperText="The password must be a minimum of 8 characters in length and should include at least one special character."
              error={
                signupState.password.trim().length < 8 ||
                /[$&+,:;=?@#|'<>.^*()%!-]/gm.test(signupState.password) ===
                  false ||
                (confirmPassword.length > 0 &&
                  signupState.password !== confirmPassword)
              }
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
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
                confirmPassword !== signupState.password
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
                    {showConfirmPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                ),
              }}
            />
          </Box>
        )}
        {stage === 2 && (
          <Box display="flex" flexDirection="column" gap={1}>
            <FormControl>
              <FormLabel
                sx={{ fontWeight: 500, color: "#212121" }}
                id="demo-radio-buttons-group-label"
              >
                Account Type
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="roleType"
                value={signupState.roleType}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={RoleType.Tenant}
                  control={<Radio />}
                  label="Individual (Tenant)"
                />
                <FormControlLabel
                  value={RoleType.Agency}
                  control={<Radio />}
                  label="Agency"
                />
                <FormControlLabel
                  value={RoleType.PropertyOwner}
                  control={<Radio />}
                  label="Property Owner"
                />
              </RadioGroup>
            </FormControl>
            {signupState.roleType == RoleType.Agency && (
              <>
                <TextFieldWithLabel
                  fullWidth
                  type="text"
                  name="agencyName"
                  label="Agency Name"
                  value={signupState.agencyName}
                  onChange={handleChange}
                  error={
                    signupState.roleType === RoleType.Agency &&
                    signupState.agencyName?.trim().length === 0
                  }
                  required={signupState.roleType == RoleType.Agency}
                />
                <TextFieldWithLabel
                  fullWidth
                  type="text"
                  name="agencyCity"
                  label="Agency City"
                  value={signupState.agencyCity}
                  onChange={handleChange}
                  error={
                    signupState.roleType === RoleType.Agency &&
                    signupState.agencyCity?.trim().length === 0
                  }
                  required={signupState.roleType == RoleType.Agency}
                />
                <TextFieldWithLabel
                  fullWidth
                  type="text"
                  name="agencyState"
                  label="Agency State"
                  value={signupState.agencyState}
                  onChange={handleChange}
                  error={
                    signupState.roleType === RoleType.Agency &&
                    signupState.agencyState?.trim().length === 0
                  }
                  required={signupState.roleType == RoleType.Agency}
                />
              </>
            )}
          </Box>
        )}
        {(response.error || response.success) && Boolean(response.message) && (
          <AlertComponent
            severity={response.error ? "error" : "success"}
            message={response.message}
            onClose={() =>
              setResponse({ error: false, success: false, message: "" })
            }
          />
        )}
        <Box
          gap={1}
          display="flex"
          py={1}
          alignItems="center"
          justifyContent="flex-end"
          sx={{ float: "right" }}
        >
          <Button
            fullWidth
            type="button"
            onClick={() => setStage((stage) => stage - 1)}
            disableElevation
            variant="contained"
            sx={{
              color: "#212121",
              backgroundColor: "rgba(64,87,109,.07)",
              display: stage == 1 ? "none" : "block",
              px: "0.5rem",
              ":hover": {
                backgroundColor: theme.palette.secondary.main,
              },
            }}
          >
            Back
          </Button>
          {stage === 2 ? (
            <PrimaryButton
              fullWidth
              type="submit"
              disableElevation
              variant="contained"
              disabled={
                !Boolean(signupState.firstName) ||
                !Boolean(signupState.lastName) ||
                !Boolean(signupState.email) ||
                !Boolean(signupState.phoneNumber) ||
                !Boolean(signupState.password) ||
                (signupState.roleType == RoleType.Agency &&
                  (!Boolean(signupState.agencyCity) ||
                    !Boolean(signupState.agencyName) ||
                    !Boolean(signupState.agencyState))) ||
                isRegistering
              }
            >
              {isRegistering ? <CircularProgress /> : "Register"}
            </PrimaryButton>
          ) : (
            <Button
              fullWidth
              type="button"
              onClick={handleStage}
              disableElevation
              variant="contained"
              disabled={
                !Boolean(signupState.firstName) ||
                !Boolean(signupState.lastName) ||
                !Boolean(signupState.email) ||
                !Boolean(signupState.phoneNumber) ||
                !Boolean(signupState.password) ||
                signupState.password !== confirmPassword ||
                isRegistering
              }
            >
              Next
            </Button>
          )}
        </Box>
        <Typography>
          Already have an account?{" "}
          <Link
            color="primary"
            style={{ textDecoration: "none", fontWeight: "bold" }}
            href="/login"
          >
            Login
          </Link>
        </Typography>
      </Box>
    </SimpleDialog>
  );
};

export default SignUp;
