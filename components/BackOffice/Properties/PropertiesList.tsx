import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { PropertiesList as PropertiesForAgency } from "@/types/property";
import StyledSearchComponent from "@/components/Shared/StyledSearchComponent";
import PropertiesLoader from "@/components/Shared/PropertiesLoader";
import { _getPropertiesForAgency } from "@/services/propertyService";
import useAuthData from "@/components/Shared/useAuthData";
import { getUser } from "@/utils/functions";

const PropertiesList: FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { authData } = useAuthData();
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<PropertiesForAgency>([]);

  // useEffect(() => {
  //   const user = getUser()
  // })
  // useEffect(() => {
  //   (async () => {
  //     setIsLoading(true);
  //     const response = await _getPropertiesForAgency({},authData!.token);
  //     const propertiesData = response.data.properties;
  //     setProperties(propertiesData);
  //     setIsLoading(false);
  //   })();
  // }, []);

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
      {isLoading ? <PropertiesLoader /> : <Grid container></Grid>}
    </Box>
  );
};

export default PropertiesList;
