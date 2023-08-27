import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CustomStepper from "@/components/Shared/CustomStepper";
import { Steps } from "@/types/shared";
import {
  AddPropertyPayload,
  IProperty,
  IPropertyImage,
  PropertyPriceType,
  PropertyType,
  UpdatePropertyPayload,
  UploadPropertyImagesRequest,
} from "@/types/property";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import {
  _addProperty,
  _getPropertyDetails,
  _saveDraft,
  _updateProperty,
  _uploadPropertyImages,
} from "@/services/propertyService";
import useAuthData from "@/components/Shared/useAuthData";
import { getPropertyAdditionValidationSchema } from "@/utils/validationSchema";
import { AxiosProgressEvent } from "axios";
import CustomCircularProgress from "@/components/Shared/CustomCircularProgress";
import { useRouter } from "next/router";
import PropertyDetailsFactory from "./PropertyDetailsFactory";
import PropertyImagesFactory from "./PropertyImagesFactory";

const initialPropertyDetailsPayloadState: AddPropertyPayload = {
  title: "",
  description: "",
  locality: "",
  street: "",
  propertyType: PropertyType.Flat,
  price: "",
  priceType: PropertyPriceType.PerAnnum,
  numberOfBedrooms: 3,
  numberOfBathrooms: 3,
  numberOfToilets: 4,
  parkingSpace: 3,
  totalLandArea: "",
  furnished: false,
  serviced: false,
  shared: false,
};

interface WithPropertFactoryProps {
  actionType: "create" | "edit";
  propertyToUpdateId?: string;
}

const PropertyFactory: FC<WithPropertFactoryProps> = ({
  actionType,
  propertyToUpdateId,
}) => {
  const router = useRouter();
  const { authData } = useAuthData();
  const [activeStep, setActiveStep] = useState(0);
  const [propertyId, setPropertyId] = useState("");
  const [propertyDetails, setPropertyDetails] = useState<AddPropertyPayload>(
    initialPropertyDetailsPayloadState
  );
  const [images, setImages] = useState<[] | File[]>([]);
  const [existingPropertyImageUrls, setExistingPropertyImageUrls] = useState<
    IPropertyImage[] | undefined
  >(undefined);
  const [response, setResponse] = useState({
    error: false,
    success: false,
    message: "",
  });
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isUpdatingProperty, setIsUpdatingProperty] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function handleNext() {
    if (activeStep === 0) {
      if (actionType == "edit") return updateProperty();
      return saveDraft();
    } else if (activeStep === 1) {
      return uploadImages();
    } else {
      return;
    }
  }

  function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  async function saveDraft() {
    const schema = getPropertyAdditionValidationSchema();
    schema
      .validate(propertyDetails)
      .then(async (validatedInputs) => {
        setIsSavingDraft(true);
        try {
          const res = await _saveDraft(validatedInputs, authData!.token);
          setIsSavingDraft(false);

          if (res.status !== 200 && res.status !== 201) {
            setIsSavingDraft(false);
            setResponse({
              ...response,
              error: true,
              message: res.data.Message,
            });
            return;
          }

          setResponse({
            ...response,
            success: true,
            message: `Property successfully saved as draft`,
          });
          setPropertyId(res.data.propertyId);
          setActiveStep((activeStep) => activeStep + 1);
        } catch (error) {
          setIsSavingDraft(false);
          setResponse({
            ...response,
            error: true,
            success: false,
            message: "Something went wrong on our end. Please try again.",
          });
        }
      })
      .catch((error) => {
        setResponse({
          ...response,
          error: true,
          success: false,
          message: error.message,
        });
      })
      .finally(() => {
        setTimeout(() => {
          setResponse({ error: false, success: false, message: "" });
        }, 9000);
      });
  }

  function handleUploadProgress(progressEvent: AxiosProgressEvent) {
    if (progressEvent.total) {
      setImageUploadProgress(
        Math.round((progressEvent.loaded * 100) / progressEvent.total)
      );
    }
  }

  async function uploadImages() {
    if (!propertyId || !images.length) {
      return setResponse({
        ...response,
        error: true,
        success: false,
        message: "Please select images to upload",
      });
    }
    setIsUploadingImages(true);
    try {
      const payload: UploadPropertyImagesRequest = {
        images,
        propertyId,
      };
      const res = await _uploadPropertyImages(
        payload,
        authData!.token,
        handleUploadProgress
      );

      if (res.status !== 200 && res.status !== 201) {
        setIsUploadingImages(false);
        setResponse({
          ...response,
          error: true,
          message: res.data.Message,
        });
        return;
      }

      setResponse({
        ...response,
        success: true,
        error: false,
        message: res.data.Message,
      });

      router.push("/backoffice/properties");
    } catch (error) {
      setIsUploadingImages(false);
      setResponse({
        ...response,
        error: true,
        success: false,
        message: "Something went wrong on our end. Please try again.",
      });
    } finally {
      setIsUploadingImages(false);
      setTimeout(() => {
        setResponse({ error: false, success: false, message: "" });
      }, 9000);
    }
  }

  async function updateProperty() {
    if (!propertyToUpdateId || !authData) return;
    setIsUpdatingProperty(true);
    try {
      const propertyUpdatePayload: UpdatePropertyPayload = {
        propertyId: propertyToUpdateId,
        ...propertyDetails,
      };
      const res = await _updateProperty(
        { ...propertyUpdatePayload },
        authData.token
      );

      if (res.status !== 200 && res.status !== 201) {
        return setResponse({
          error: true,
          message: res.data.Message,
          success: false,
        });
      }

      setPropertyId(propertyToUpdateId);
      setActiveStep((activeStep) => activeStep + 1);
    } catch (error) {
      setResponse({
        error: true,
        message: "Error occurred while trying to update property",
        success: false,
      });
    } finally {
      setIsUpdatingProperty(false);
    }
  }

  useEffect(() => {
    if (propertyToUpdateId) {
      (async () => {
        setIsLoading(true);
        try {
          const res = await _getPropertyDetails(propertyToUpdateId);
          if (res.status !== 200) {
            return setResponse({
              success: false,
              error: true,
              message: "Error fetching property details",
            });
          }
          const { images, ...data } = res.data as IProperty;
          setPropertyDetails(data);
          setExistingPropertyImageUrls(images);
        } catch (error) {
          setResponse({
            success: false,
            error: true,
            message: "Error fetching property details",
          });
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [propertyToUpdateId]);

  const steps: Steps[] = [
    {
      stepLabel: "Property Details",
      stepComponent: (
        <PropertyDetailsFactory
          propertyDetails={propertyDetails}
          setPropertyDetails={setPropertyDetails}
          key="propertyDetails"
        />
      ),
    },
    {
      stepLabel: "Pictures",
      stepComponent: (
        <PropertyImagesFactory
          authData={authData}
          actionType={actionType}
          propertyId={propertyId}
          images={images}
          isUploadingImages={isUploadingImages}
          setImages={setImages}
          key="propertyImages"
          existingPropertyImageUrls={existingPropertyImageUrls}
        />
      ),
    },
  ];

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Box py={6} px={6}>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        message={response.message}
        open={(response.error || response.success) && Boolean(response.message)}
        autoHideDuration={9000}
      />
      <CustomStepper
        activeStep={activeStep}
        steps={steps}
        backButtonElement={
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            startIcon={<KeyboardArrowLeftIcon />}
          >
            Back
          </Button>
        }
        nextButtonElement={
          <Button
            disabled={isSavingDraft || isUpdatingProperty || isUploadingImages}
            variant="contained"
            disableElevation
            onClick={handleNext}
            endIcon={<KeyboardArrowRightIcon />}
          >
            {activeStep === 0 &&
              (isSavingDraft || isUpdatingProperty
                ? actionType === "create"
                  ? "Saving draft..."
                  : "Updating property..."
                : "Save & Add Pictures")}
            {activeStep === 1 &&
              (isUploadingImages ? (
                <CustomCircularProgress value={imageUploadProgress} />
              ) : actionType === "create" ? (
                "Publish"
              ) : (
                "Update Images"
              ))}
          </Button>
        }
      />
    </Box>
  );
};

export default PropertyFactory;
