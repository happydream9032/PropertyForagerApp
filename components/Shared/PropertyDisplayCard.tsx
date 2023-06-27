import React, { ElementType, FC } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import LocationIcon from "@mui/icons-material/LocationOnOutlined";
import BedroomIcon from "@mui/icons-material/BedroomParentOutlined";
import BathroomIcon from "@mui/icons-material/BathroomOutlined";
import { PropertyOverview, PropertyPriceType } from "@/types/property";
import Link from "next/link";

const PropertyDisplayCard: FC<PropertyOverview> = (props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        cursor: "pointer",
        textDecoration: "none",
        "& .MuiBox-root": {
          ":hover": {
            transform: "scale(1.03)",
            transitionProperty: "transform",
            transitionTimingFunction: theme.transitions.easing.easeInOut,
            transitionDuration: "150ms",
          },
        },
        ":hover": {
          transform: "scale(1.03)",
          transitionProperty: "transform",
          transitionTimingFunction: theme.transitions.easing.easeInOut,
          transitionDuration: "150ms",
        },
      }}
      href={`/property/${props.id}`}
      component={Link}
    >
      <Box
        sx={{
          backgroundImage: `url("${props.images[0].imageURL}")`,
          width: "100%",
          height: "250px",
          objectFit: "scale-down",
          borderRadius: "0.5rem",
          backgroundSize: "cover",
        }}
      ></Box>
      <Paper
        elevation={4}
        sx={{
          width: "95%",
          height: "fit-content",
          mx: "auto",
          mt: -6,
          borderRadius: "0.5rem",
          padding: "1rem",
        }}
      >
        <Typography fontWeight={500} variant="h4" component="h4">
          {props.title}
        </Typography>
        {props.description && (
          <Typography variant="body1" component="p" my={2}>
            {props.description}
          </Typography>
        )}
        <Typography
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            padding: "0.4rem",
            borderRadius: "0.3rem",
            width: "fit-content",
          }}
          my={2}
          variant="h6"
          fontWeight={500}
        >
          ₦{props.price.toLocaleString("en")} per{" "}
          {props.priceType == PropertyPriceType.PerAnnum ? "annum" : "month"}
        </Typography>
        <Stack
          my={2}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{
            border: `3px solid ${theme.palette.grey[300]}`,
            borderRadius: "5px",
            padding: "10px",
            // flexDirection: { xs: "column", sm: "row" },
          }}
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "column" },
              // flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              color={theme.palette.grey[800]}
              fontWeight={500}
              variant="body1"
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Bedrooms
            </Typography>
            <BedroomIcon
              fontSize="large"
              sx={{
                display: { xs: "block", sm: "none" },
                color: theme.palette.grey[700],
              }}
            />
            <Typography
              fontSize="1rem"
              fontWeight={700}
              variant="body1"
              component="strong"
            >
              {props.numberOfBedrooms}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "column" },
              // flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              color={theme.palette.grey[800]}
              fontWeight={500}
              variant="body1"
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Bathrooms
            </Typography>
            <BathroomIcon
              fontSize="large"
              sx={{
                display: { xs: "block", sm: "none" },
                color: theme.palette.grey[700],
              }}
            />
            <Typography
              fontSize="1rem"
              fontWeight={700}
              variant="body1"
              component="strong"
            >
              {props.numberOfBathrooms}
            </Typography>
          </Box>
          <Box
            sx={{
              display: !props.totalLandArea ? "none" : "flex",
              // flexDirection: { xs: "row", sm: "column" },
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              color={theme.palette.grey[800]}
              fontWeight={500}
              variant="body1"
              component="span"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Total Space
            </Typography>
            <Typography
              fontSize="1rem"
              fontWeight={700}
              variant="body1"
              component="strong"
            >
              {props.totalLandArea} ft<sup>2</sup>
            </Typography>
          </Box>
        </Stack>
        <Typography gap={1} display="flex" alignItems="center" mt={1}>
          <LocationIcon color="primary" />{" "}
          <Typography fontWeight={500} variant="body1" component="strong">
            {props.street},{props.locality}
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};

export default PropertyDisplayCard;
