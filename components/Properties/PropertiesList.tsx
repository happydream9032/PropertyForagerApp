import { PropertiesList } from "@/types/property";
import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PropertyDisplayCard from "../Shared/PropertyDisplayCard";
import { _getPropertiesList } from "@/services/propertyService";
import { CircularProgress } from "@mui/material";
import PropertiesLoader from "../Shared/PropertiesLoader";

const PropertiesList: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [propertiesList, setPropertiesList] = useState<PropertiesList>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await _getPropertiesList();
      const propertiesData = response.data.data;
      setPropertiesList(propertiesData);
      setIsLoading(false);
    })();
  }, []);

  return (
    <Box mt={2} sx={{ py: 2, px: { xs: 2, sm: 6 } }}>
      {isLoading ? (
        <PropertiesLoader />
      ) : (
        <Grid mt={2} spacing={4} container>
          {propertiesList.map((p) => (
            <Grid xs={12} md={6} lg={4} item key={p.id}>
              <PropertyDisplayCard
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
