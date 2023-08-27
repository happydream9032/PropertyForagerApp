import { IPropertyImage } from "@/types/property";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { FC, useState } from "react";
import { useTheme } from "@mui/material/styles";
import StyledSvg from "@/components/Shared/StyledSvg";
import ImageViewModal from "./ImageViewModal";

const ImageGallery: FC<{ images: IPropertyImage[] }> = ({ images }) => {
  const theme = useTheme();
  const [openImageViewer, setOpenImageViewer] = useState(false);
  return (
    <Box
      sx={{ backgroundColor: theme.palette.primary.main, py: 14, px: 4 }}
      display="flex"
      flexDirection="column"
      gap={6}
    >
      <ImageViewModal
        images={images}
        open={openImageViewer}
        setOpen={setOpenImageViewer}
      />
      <Typography sx={{ color: "white" }} fontWeight={500} variant="h3">
        Image gallery
      </Typography>
      <Grid
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        spacing={4}
        container
        overflow="hidden"
      >
        {images.map((image, index) => (
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
            key={index}
            item
            xs={12}
            sm={6}
            lg={4}
            sx={{
              cursor: "pointer",
              ":hover": {
                img: {
                  opacity: 0.8,
                },
                svg: {
                  display: "block",
                },
              },
            }}
            position="relative"
          >
            <Box
              sx={{
                display: "inline-block",
                maxWidth: "100%",
                maxHeight: "100%",
                height: "15rem",
                width: "100%",
                verticalAlign: "middle",
                overflow: "clip",
                overflowClipMargin: "content-box",
                transform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transformStyle: "preserve-3d",
                ":hover": {
                  transform:
                    "translate3d(0px,0px,0px) scale3d(1.1,1.1,1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg,0deg)",
                  willChange: "transform",
                },
                transitionProperty: "transform",
                transitionTimingFunction: theme.transitions.easing.easeIn,
                transitionDuration: "0.5s",
              }}
              component="img"
              alt="property image"
              src={image.imageURL}
              loading="lazy"
            ></Box>
            <StyledSvg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              sx={{
                color: "white",
                p: 1,
                backgroundColor: theme.palette.primary.main,
                display: "none",
              }}
              onClick={() => setOpenImageViewer(true)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </StyledSvg>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageGallery;
