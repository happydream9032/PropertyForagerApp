import React, { ChangeEvent, FC, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StyledFileInput from "@/components/Shared/StyledFileInput";
import Button from "@mui/material/Button";
import ImagesPreviewComponent from "@/components/Shared/ImagesPreviewComponent";
import { IPropertyImage } from "@/types/property";
import { IAuthenticateResponse } from "@/types/user";

interface IProps {
  actionType: "create" | "edit";
  authData: IAuthenticateResponse | null;
  propertyId: string;
  isUploadingImages: boolean;
  images: [] | File[];
  setImages: React.Dispatch<React.SetStateAction<[] | File[]>>;
  existingPropertyImageUrls?: IPropertyImage[];
}
const PropertyImagesFactory: FC<IProps> = ({
  isUploadingImages,
  actionType,
  images,
  setImages,
  existingPropertyImageUrls,
  propertyId,
  authData,
}) => {
  const [imagesForPreview, setImagesForPreview] = useState<IPropertyImage[]>(
    existingPropertyImageUrls ?? []
  );

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const imgPrev = URL.createObjectURL(file);
        const imagePreviewObj: IPropertyImage = {
          createdAt: new Date(),
          createdByUserId: "",
          fileId: "",
          id: "",
          imageURL: imgPrev,
          updatedAt: new Date(),
          verified: true,
        };
        setImagesForPreview((imagesForPreview) =>
          imagesForPreview.concat([imagePreviewObj])
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
          <ImagesPreviewComponent
            authData={authData}
            actionType={actionType}
            propertyId={propertyId}
            imagesForPreview={imagesForPreview}
            setImages={setImages}
            setImagesForPreview={setImagesForPreview}
            key="ImagesPreviewForEdit"
          />
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

export default PropertyImagesFactory;
