import React, { useEffect } from "react";

import EditPropertyComponent from "@/components/BackOffice/Properties/EditProperty/EditProperty";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";

function EditProperty() {
  const router = useRouter();
  let { propertyId } = router.query;

  useEffect(() => {
    console.log("property id", propertyId);
    if (!propertyId) return router.back();
  }, [propertyId, router]);

  return (
    propertyId && (
      <Layout pageTitle="Edit Property">
        <EditPropertyComponent propertyId={propertyId.toString()} />
      </Layout>
    )
  );
}

export default EditProperty;
