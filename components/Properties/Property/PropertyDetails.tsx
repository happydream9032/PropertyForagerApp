import { IProperty } from "@/types/property";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { FC } from "react";
import PropertySummary from "./PropertySummary";
import ImageGallery from "./ImageGallery";
import ContactAgent from "./ContactAgent";

const PropertyDetails: FC<IProperty> = (props) => {
  return (
    <Box
      sx={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}
      display="flex"
      flexDirection="column"
      gap={3}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="left"
        justifyContent="center"
        sx={{ py: 3, px: 4 }}
      >
        <Typography fontWeight={500} variant="h3">
          {props.street}
        </Typography>
        <Typography fontWeight={500} variant="h6">
          {props.locality}
        </Typography>
      </Box>
      <PropertySummary {...props} />
      <ImageGallery images={props.images} />
      <ContactAgent {...props} />
    </Box>
  );
};

export default PropertyDetails;
