import Layout from "@/components/Layout/Layout";
import LoginComponent from "@/components/User/Login";
import { getAuthorizedRedirectPath } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Lpgin() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    const previousPage = router.query["rt"] as string;
    const redirectPath = getAuthorizedRedirectPath(previousPage);
    if (!redirectPath) {
      router.replace("/");
    } else {
      router.replace(redirectPath);
    }
  };

  return (
    <Layout pageTitle="Log in">
      <LoginComponent handleClose={handleClose} openLoginForm={open} />
    </Layout>
  );
}
