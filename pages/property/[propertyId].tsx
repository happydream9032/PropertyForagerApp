import Layout from "@/components/Layout/Layout";
import PropertyDetails from "@/components/Properties/Property/PropertyDetails";
import { _getPropertyDetails } from "@/services/propertyService";
import { IProperty } from "@/types/property";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{
  property: IProperty;
}> = async ({ params }) => {
  const response = await _getPropertyDetails(
    params?.propertyId?.toString() ?? ""
  );
  if (response.status !== 200) {
    return { notFound: true };
  }
  return { props: { property: response.data } };
};

export default function Property({
  property,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout pageTitle="Property Details">
      <PropertyDetails {...property} />
    </Layout>
  );
}
