import Layout from "@/components/Layout/Layout";
import HomeComponent from "@/components/Home/Home";
import { _getLatestProperties } from "@/services/propertyService";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { PropertiesList } from "@/types/property";

export const getStaticProps: GetStaticProps<{
  properties: PropertiesList;
}> = async () => {
  const response = await _getLatestProperties();
  const propertiesData = response.data.properties;

  return {
    props: {
      properties: propertiesData,
    },
    revalidate: 60,
  };
};

export default function Home({
  properties,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout pageTitle="Home">
      <HomeComponent properties={properties} />
    </Layout>
  );
}
