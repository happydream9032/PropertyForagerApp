import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import { IProperty } from "@/types/property";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import Features from "./Features";
import ListingPriceCardBox from "./ListingPriceCardBox";
import StyledSvg from "@/components/Shared/StyledSvg";
import ImageViewModal from "./ImageViewModal";

const PropertySummary: FC<IProperty> = (props) => {
  const theme = useTheme();
  const [active, setActive] = useState(0);
  const [openImageViewer, setOpenImageViewer] = useState(false);

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
      <ImageViewModal
        images={props.images}
        open={openImageViewer}
        setOpen={setOpenImageViewer}
      />
      <ListingPriceCardBox
        sx={{ mx: "auto", display: { sm: "none" }, width: "90%" }}
        {...props}
      />
      <Box
        sx={{
          width: { xs: "90%", md: "80%" },
          height: { xs: "400px", md: "600px" },
          mx: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "1.2rem",
            }}
            component="img"
            src={props.images[active]?.imageURL}
            sizes="(max-width: 479px) 83vw, (max-width: 767px) 87vw, (max-width: 991px) 79vw, (max-width: 1279px) 82vw, 1046.390625px"
          ></Box>
          <StyledSvg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            sx={{
              p: 1,
              color: "white",
              backgroundColor: "black",
              cursor: "pointer",
              top: 15,
              left: 15,
            }}
            onClick={() => setOpenImageViewer(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </StyledSvg>
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
              display: { xs: "none", sm: "unset" },
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
              display: { xs: "none", sm: "flex" },
              px: 1,
              position: "absolute",
              bottom: 20,
              left: 10,
              color: "white",
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
      <Features
        {...props}
        sx={{
          display: { xs: "flex", sm: "none" },
          width: "100%",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          px: 1,
        }}
      />
    </Box>
  );
};

export default PropertySummary;
