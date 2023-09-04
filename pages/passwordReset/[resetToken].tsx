import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import ResetPasswordComponent from "@/components/User/ResetPassword";
import { Typography } from "@mui/material";

export default function PasswordReset() {
  const router = useRouter();
  const { resetToken } = router.query;
  return (
    <Layout pageTitle="Reset Password">
      {resetToken && resetToken.length > 0 ? (
        <ResetPasswordComponent
          action="reset"
          resetToken={resetToken?.toString()}
        />
      ) : (
        <Typography textAlign="center" fontWeight={500} variant="h5">
          You do not have a valid password reset token
        </Typography>
      )}
    </Layout>
  );
}
