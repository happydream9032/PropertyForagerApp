import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { IPropertyImage } from "@/types/property";
import { _deletePropertyImage } from "@/services/propertyService";
import { IAuthenticateResponse } from "@/types/user";

interface IProps {
  actionType: "create" | "edit";
  authData: IAuthenticateResponse | null;
  propertyId: string;
  imagesForPreview: IPropertyImage[];
  setImagesForPreview: React.Dispatch<React.SetStateAction<IPropertyImage[]>>;
  setImages: React.Dispatch<React.SetStateAction<[] | File[]>>;
}
const ImagesPreviewComponent: FC<IProps> = ({
  actionType,
  propertyId,
  authData,
  imagesForPreview,
  setImagesForPreview,
  setImages,
}) => {
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  const handleImageDelete = async (index: number) => {
    if (actionType === "create") {
      setImagesForPreview((imagesForPreview) =>
        imagesForPreview.filter((_, i) => i !== index)
      );
      setImages((images) => images.filter((_, i) => i !== index));
    } else {
      if (imagesForPreview[index].fileId.trim().length) {
        setIsDeletingImage(true);
        try {
          const res = await _deletePropertyImage(
            propertyId,
            imagesForPreview[index].fileId,
            authData!.token
          );
          if (res.status === 200 || res.status === 201) {
            setImagesForPreview((imagesForPreview) =>
              imagesForPreview.filter((_, i) => i !== index)
            );
            setImages((images) =>
              images.length ? images.slice(0, images.length - 1) : []
            );
          }
        } catch (error) {
          console.log("Error deleting image", error);
        } finally {
          setIsDeletingImage(false);
        }
      } else {
        setImagesForPreview((imagesForPreview) =>
          imagesForPreview.filter((_, i) => i !== index)
        );
        setImages((images) =>
          images.length ? images.slice(0, images.length - 1) : []
        );
      }
    }
  };

  return (
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
              src={imagePrev.imageURL}
            ></Box>
            <Button
              disableElevation
              disabled={isDeletingImage}
              size="small"
              variant="contained"
              sx={{
                position: "absolute",
                right: 4,
                top: 2,
                textTransform: "none",
              }}
              onClick={() => handleImageDelete(index)}
            >
              {isDeletingImage ? "Removing image..." : "Remove"}
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImagesPreviewComponent;
