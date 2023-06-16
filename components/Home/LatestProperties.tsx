import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PropertyDisplayCard from "./PropertyDisplayCard";
import { PropertyPriceType, LatestProperties } from "@/types/property";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useTheme } from "@mui/material/styles";
import { _getLatestProperties } from "@/services/propertyService";

const LatestProperties: FC = () => {
  const theme = useTheme();
  const [latestProperties, setLatestProperties] = useState<LatestProperties>({
    properties: [],
  });

  useEffect(() => {
    (async () => {
      const response = await _getLatestProperties();
      const propertiesData = response.data as LatestProperties;

      setLatestProperties(propertiesData);
    })();
  }, []);

  return (
    <Box mt={2} sx={{ py: 2, px: { xs: 2, sm: 6 } }}>
      <Box
        sx={{ flexDirection: { xs: "column", md: "row" } }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={4}
      >
        <Box textAlign="left">
          <Typography
            textAlign="center"
            fontWeight={500}
            variant="h3"
            component="h2"
          >
            Latest Properties
          </Typography>
          <Typography
            sx={{
              textAlign: { xs: "center", md: "left" },
              color: "gray",
              fontWeight: 500,
              mt: 1,
            }}
          >
            Check out some of our latest properties
          </Typography>
        </Box>

        <PrimaryButton
          sx={{
            ":hover": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              border: "none",
            },
            border: `2px solid ${theme.palette.primary.main}`,
          }}
          disableElevation
          variant="outlined"
        >
          View All Properties
        </PrimaryButton>
      </Box>
      <Grid mt={2} spacing={4} container>
        {latestProperties.properties.map((p) => (
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
    </Box>
  );
};

export default LatestProperties;
