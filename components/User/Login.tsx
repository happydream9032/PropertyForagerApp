import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SimpleDialog from "../Modals/SimpleDialog";
import TextFieldWithLabel from "../TextFields/TextFieldWithLabel";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOffOutlined";
import PrimaryButton from "../Buttons/PrimaryButton";
import Link from "next/link";
import { _loginUser } from "@/services/userService";
import { IAuthenticateResponse } from "@/types/user";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { FORAGER_AUTH_DATA } from "@/utils/constants";
import { getAuthorizedRedirectPath } from "@/utils/routes";

interface IProps {
  openLoginForm: boolean;
  handleClose: () => void;
}

const Login: FC<IProps> = ({ openLoginForm = false, handleClose }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState({
    error: false,
    success: false,
    message: "",
  });

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      const res = await _loginUser(email, password);

      if (res.status !== 200 && res.status !== 201) {
        setResponse({ ...response, error: true, message: res.data.Message });
        return;
      }
      const resData = res.data as IAuthenticateResponse;
      setResponse({
        ...response,
        success: true,
        message: "Logged in Successfully. Redirecting...",
      });

      document.cookie = `${FORAGER_AUTH_DATA}=${JSON.stringify(
        resData
      )};expires=${dayjs().add(60, "minute").toString()};`;
      const previousPage = router.query["rt"] as string;
      const redirectPath = getAuthorizedRedirectPath(previousPage);
      if (!redirectPath) {
        return router.push(
          `/${resData.userName.split("@")[0]}?pId=${resData.id}`
        );
      }
      router.push(redirectPath);
    } catch (error) {
      setResponse({
        ...response,
        error: true,
        success: false,
        message: "Something went wrong on our end. Please try again.",
      });
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setResponse({ error: false, success: false, message: "" });
      }, 9000);
    }
  };
  return (
    <SimpleDialog
      maxWidth="md"
      fullWidth={true}
      sx={{ width: { xs: "95%", sm: "60%", md: "50%", lg: "40%" }, mx: "auto" }}
      handleClose={handleClose}
      open={openLoginForm}
      modalTitle="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        component="form"
        sx={{ py: 2 }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextFieldWithLabel
          fullWidth
          type="email"
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextFieldWithLabel
          fullWidth
          type={showPassword ? "text" : "password"}
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <PrimaryButton
          fullWidth
          type={"submit"}
          disableElevation
          variant="contained"
          disabled={!Boolean(email) || !Boolean(password) || isProcessing}
        >
          {isProcessing ? <CircularProgress /> : "Login"}
        </PrimaryButton>
        <Typography>
          Don&apos;t have an account yet? <Link href="/signup">Sign up</Link>
        </Typography>
      </Box>
    </SimpleDialog>
  );
};

export default Login;
