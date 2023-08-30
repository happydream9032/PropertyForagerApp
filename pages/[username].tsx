import Layout from "@/components/Layout/Layout";
import useAuthData from "@/components/Shared/useAuthData";
import { useRouter } from "next/router";
import React from "react";
import ProfileComponent from "@/components/User/Profile";

export default function Profile() {
  const router = useRouter();
  const { authData } = useAuthData();
  const { username, pId } = router.query;

  return (
    <Layout pageTitle={String(username).toUpperCase()}>
      <ProfileComponent authData={authData} />
    </Layout>
  );
}
