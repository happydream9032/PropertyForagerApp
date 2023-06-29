import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import { IProperty } from "@/types/property";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import Features from "./Features";
import ListingPriceCardBox from "./ListingPriceCardBox";

const PropertySummary: FC<IProperty> = (props) => {
  const theme = useTheme();
  const [active, setActive] = useState(0);
  const maxImageIndex = props.images.length - 1;

  const handleBackClick = () => {
    if (active === 0) {
      setActive(maxImageIndex);
    } else {
      setActive((active) => active - 1);
    }
  };

  const handleForwardClick = () => {
    if (active === maxImageIndex) {
      console.log("yes");
      setActive(0);
    } else {
      setActive((active) => active + 1);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ px: { xs: 1, md: 4 }, width: "100%" }}
      gap={4}
      mb={4}
    >
      <ListingPriceCardBox
        sx={{ mx: "auto", display: { md: "none" } }}
        {...props}
      />
      <Box sx={{ width: "80%", height: "600px", mx: "auto" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            backgroundImage: `url("${props.images[active].imageURL}") !important`,
            objectFit: "scale-down",
            backgroundSize: "cover !important",
            backgroundColor: theme.palette.primary.dark,
            borderRadius: "1.2rem",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              p: { xs: 1, md: 2 },
              backgroundColor: theme.palette.primary.main,
              ":hover": {
                backgroundColor: theme.palette.primary.dark,
              },
              color: "white",
              fontWeight: 800,
              left: { xs: -20, md: -30 },
            }}
            onClick={handleBackClick}
          >
            <ArrowBackIcon fontSize="medium" />
          </IconButton>
          <ListingPriceCardBox
            sx={{
              display: { xs: "none", md: "unset" },
              width: "16rem",
              position: "absolute",
              right: 30,
              mt: -8,
            }}
            {...props}
          />
          <Features
            {...props}
            sx={{
              px: 1,
              position: "absolute",
              bottom: 20,
              left: 10,
              color: { md: "white" },
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,1))",
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              p: { xs: 1, md: 2 },
              backgroundColor: theme.palette.primary.main,
              ":hover": {
                backgroundColor: theme.palette.primary.dark,
              },
              color: "white",
              fontWeight: 800,
              right: { xs: -20, md: -30 },
            }}
            onClick={handleForwardClick}
          >
            <ArrowForwardIcon fontSize="medium" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertySummary;
