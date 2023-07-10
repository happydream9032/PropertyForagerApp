import Layout from "@/components/Layout/Layout";
import HomeComponent from "@/components/Home/Home";
import { _getLatestProperties } from "@/services/propertyService";

export default function Home() {
  return (
    <Layout pageTitle="Home">
      <HomeComponent />
    </Layout>
  );
}
