import Layout from "@/components/Layout/Layout";
import HomeComponent from "@/components/Home/Home";
import { _getLatestProperties } from "@/services/propertyService";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { PropertiesList } from "@/types/property";

export const getServerSideProps: GetServerSideProps<{
  properties: PropertiesList;
}> = async () => {
  const response = await _getLatestProperties();
  const propertiesData = response.data.properties;

  return {
    props: {
      properties: propertiesData,
    },
  };
};

export default function Home({
  properties,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout pageTitle="Home">
      <HomeComponent properties={properties} />
    </Layout>
  );
}
