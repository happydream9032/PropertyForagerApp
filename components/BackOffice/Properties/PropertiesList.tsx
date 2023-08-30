import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import {
  GetPropertiesForAgencyRequest,
  GetPropertiesForOwnerRequest,
  PropertiesList as PropertiesForAgency,
} from "@/types/property";
import StyledSearchComponent from "@/components/Shared/StyledSearchComponent";
import PropertiesLoader from "@/components/Shared/PropertiesLoader";
import { _getPropertiesForAgency } from "@/services/propertyService";
import useAuthData from "@/components/Shared/useAuthData";
import { getAgency, getUser } from "@/utils/functions";
import PropertyDisplayCard from "@/components/Shared/PropertyDisplayCard";

const PropertiesList: FC = () => {
  const router = useRouter();
  const { authData } = useAuthData();
  const [searchValue, setSearchValue] = useState("");
  const [properties, setProperties] = useState<PropertiesForAgency>([]);
  const [isFetchingProperties, setIsFetchingProperties] = useState(false);
  const [response, setResponse] = useState({
    error: false,
    success: false,
    message: "",
  });

  async function getPropertiesForAgency(
    requestObj: GetPropertiesForAgencyRequest & GetPropertiesForOwnerRequest
  ) {
    setIsFetchingProperties(true);
    let payload = {} as GetPropertiesForAgencyRequest &
      GetPropertiesForOwnerRequest;

    (
      Object.keys(requestObj) as Array<
        keyof (GetPropertiesForAgencyRequest & GetPropertiesForOwnerRequest)
      >
    ).forEach((key) => {
      if (requestObj[key]) {
        payload = { ...payload, [key]: requestObj[key] };
      }
    });
    try {
      const res = await _getPropertiesForAgency(payload, authData!.token);
      if (res.status !== 200) {
        return setResponse({
          error: true,
          message: "Error fetching properties",
          success: false,
        });
      }
      const propertiesData = res.data.data;
      setProperties(propertiesData);
    } catch (error) {
    } finally {
      setIsFetchingProperties(false);
    }
  }

  useEffect(() => {
    const user = getUser();
    const agency = getAgency();
    if (authData && (user || agency)) {
      (async () => {
        let payload = {} as GetPropertiesForAgencyRequest &
          GetPropertiesForOwnerRequest;
        if (authData.roles.includes("Agency") && agency) {
          payload.agencyId = agency.id;
        } else {
          payload.ownerId = authData.id;
        }
        await getPropertiesForAgency(payload);
      })();
    }
  }, [authData]);

  return (
    <Box py={6} px={6}>
      <Grid container alignItems="center" spacing={4}>
        <Grid item xs={12} sm={6}>
          <PrimaryButton
            disableElevation
            sx={{ textTransform: "none" }}
            variant="contained"
            endIcon={
              <AddIcon
                sx={{
                  width: "1.5rem",
                  height: "1.5rem",
                  //   backgroundColor: theme.palette.primary.dark,
                }}
              />
            }
            onClick={() => router.push("/backoffice/properties/add")}
          >
            Add Property
          </PrimaryButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledSearchComponent
            handleSearch={() => {}}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            showSearchButton={false}
          />
        </Grid>
      </Grid>
      {isFetchingProperties ? (
        <PropertiesLoader />
      ) : (
        <Grid mt={2} container spacing={4}>
          {properties.map((p) => (
            <Grid xs={12} md={6} lg={4} item key={p.id}>
              <PropertyDisplayCard
                authData={authData}
                id={p.id}
                images={p.images}
                locality={p.locality}
                numberOfBathrooms={p.numberOfBathrooms}
                numberOfBedrooms={p.numberOfBedrooms}
                price={p.price}
                priceType={p.priceType}
                street={p.street}
                title={p.title}
                description={p.description}
                totalLandArea={p.totalLandArea}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PropertiesList;
