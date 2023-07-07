import SimpleDialog from "@/components/Modals/SimpleDialog";
import { IPropertyImage } from "@/types/property";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowForwardIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/material/IconButton";
import React, { FC, useState } from "react";
import { useTheme } from "@mui/material/styles";

interface IProps {
  images: IPropertyImage[];
  open: boolean;
  setOpen: (open: boolean) => void;
}
const ImageViewModal: FC<IProps> = ({ open, setOpen, images }) => {
  const theme = useTheme();

  const [active, setActive] = useState(0);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <SimpleDialog
      modalTitle=""
      handleClose={handleClose}
      open={open}
      maxWidth={false}
      fullWidth={true}
      fullScreen
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "black",
        },
        button: {
          color: "white",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
          backgroundColor: { xs: "inherit", sm: "GrayText" },
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "80%" },
            height: "400px",
            position: "relative",
            mx: "auto",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            component="img"
            src={images[active].imageURL}
            sizes="(max-width: 479px) 83vw, (max-width: 767px) 87vw, (max-width: 991px) 79vw, (max-width: 1279px) 82vw, 1046.390625px"
          ></Box>
        </Box>

        <IconButton
          sx={{
            position: "absolute",
            top: 150,
            p: { xs: 1, md: 2 },
            color: "whitesmoke",
            fontWeight: 500,
            left: { xs: -25, sm: -30 },
            display: active === 0 ? "none" : "block",
          }}
          disabled={active === 0}
          onClick={() => setActive((active) => active - 1)}
        >
          <ArrowBackIcon
            sx={{
              fontSize: { xs: "3rem", sm: "4rem" },
            }}
          />
        </IconButton>
        <IconButton
          sx={{
            position: "absolute",
            top: 150,
            p: 1,
            color: "whitesmoke",
            fontWeight: 800,
            right: { xs: -25, sm: -30 },
            display: active === images.length - 1 ? "none" : "block",
          }}
          disabled={active === images.length - 1}
          onClick={() => setActive((active) => active + 1)}
        >
          <ArrowForwardIcon
            sx={{
              fontSize: { xs: "3rem", sm: "4rem" },
            }}
          />
        </IconButton>
        <Box
          display="flex"
          gap={3}
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            position: "absolute",
            bottom: -90,
            overflowX: "scroll",
          }}
        >
          {images.map((image, index) => (
            <Box
              onClick={() => setActive(index)}
              sx={{ height: "4rem", width: "4rem", cursor: "pointer" }}
              key={index}
              component="img"
              src={image.imageURL}
            ></Box>
          ))}
        </Box>
      </Box>
    </SimpleDialog>
  );
};

export default ImageViewModal;
