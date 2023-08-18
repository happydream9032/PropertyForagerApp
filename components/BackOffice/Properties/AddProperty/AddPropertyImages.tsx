import React, { ChangeEvent, FC, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StyledFileInput from "@/components/Shared/StyledFileInput";
import Button from "@mui/material/Button";

interface IProps {
  isUploadingImages: boolean;
  images: [] | File[];
  setImages: React.Dispatch<React.SetStateAction<[] | File[]>>;
}
const AddPropertyImages: FC<IProps> = ({
  isUploadingImages,
  images,
  setImages,
}) => {
  const [imagesForPreview, setImagesForPreview] = useState<string[]>([]);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const imgPrev = URL.createObjectURL(file);
        setImagesForPreview((imagesForPreview) =>
          imagesForPreview.concat([imgPrev])
        );
        setImages([...images, file]);
      }
    }
  };

  return (
    <Box py={4} px={2} display="flex" flexDirection="column" gap={3}>
      {imagesForPreview.length > 0 && (
        <Box
          py={2}
          px={2}
          sx={{ border: "1px solid gray", borderRadius: "5px" }}
        >
          <Typography
            fontWeight={500}
            textAlign="center"
            variant="h5"
            py={1}
            sx={{}}
          >
            Pictures Preview
          </Typography>
          <Grid container spacing={2}>
            {imagesForPreview.map((imagePrev, index) => (
              <Grid key={index} item xs={12} sm={6} lg={4}>
                <Box
                  sx={{
                    width: "100%",
                    height: "17rem",
                    position: "relative",
                    padding: "0.2rem",
                    border: "1px solid lightgray",
                    borderRadius: "5px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                    component="img"
                    src={imagePrev}
                  ></Box>
                  <Button
                    disableElevation
                    size="small"
                    variant="contained"
                    sx={{
                      position: "absolute",
                      right: 4,
                      top: 2,
                      textTransform: "none",
                    }}
                    onClick={() => {
                      setImagesForPreview((imagesForPreview) =>
                        imagesForPreview.filter((_, i) => i !== index)
                      );
                      setImages((images) =>
                        images.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <label
        style={{ marginRight: "auto", marginLeft: "auto", marginTop: "2rem" }}
        htmlFor="file-input"
      >
        <StyledFileInput
          accept="image/*"
          id="file-input"
          type="file"
          sx={{ display: "none" }}
          multiple
          onChange={handleUpload}
          disabled={imagesForPreview.length === 3 || isUploadingImages}
        />
        <Button
          disabled={imagesForPreview.length === 3 || isUploadingImages}
          disableElevation
          variant="contained"
          color="secondary"
          component="span"
          sx={{ mx: "auto" }}
        >
          Select photos to upload
        </Button>
      </label>
    </Box>
  );
};

export default AddPropertyImages;
