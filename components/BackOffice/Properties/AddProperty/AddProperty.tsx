import React, { useState } from "react";
import Box from "@mui/material/Box";
import CustomStepper from "@/components/Shared/CustomStepper";
import { Steps } from "@/types/shared";
import AddPropertyDetails from "./AddPropertyDetails";
import AddPropertyImages from "./AddPropertyImages";
import FinalizePropertyAddition from "./FinalizePropertyAddition";
import {
  AddPropertyPayload,
  PropertyPriceType,
  PropertyType,
  UploadPropertyImagesRequest,
} from "@/types/property";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Snackbar from "@mui/material/Snackbar";
import {
  _addProperty,
  _saveDraft,
  _uploadPropertyImages,
} from "@/services/propertyService";
import useAuthData from "@/components/Shared/useAuthData";
import { getPropertyAdditionValidationSchema } from "@/utils/validationSchema";
import { AxiosProgressEvent } from "axios";
import CustomCircularProgress from "@/components/Shared/CustomCircularProgress";
import { useRouter } from "next/router";

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

const AddProperty = () => {
  const router = useRouter();
  const { authData } = useAuthData();
  const [activeStep, setActiveStep] = useState(0);
  const [propertyId, setPropertyId] = useState("");
  const [propertyDetails, setPropertyDetails] = useState<AddPropertyPayload>(
    initialPropertyDetailsPayloadState
  );
  const [images, setImages] = useState<[] | File[]>([]);

  const [response, setResponse] = useState({
    error: false,
    success: false,
    message: "",
  });
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  function handleNext() {
    if (activeStep === 0) {
      return saveDraft();
    } else if (activeStep == 1) {
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
        console.log("validatedInputs", validatedInputs);
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

      setTimeout(() => {
        router.push("/backoffice/properties");
      }, 9000);
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

  const steps: Steps[] = [
    {
      stepLabel: "Property Details",
      stepComponent: (
        <AddPropertyDetails
          propertyDetails={propertyDetails}
          setPropertyDetails={setPropertyDetails}
          key="propertyDetails"
        />
      ),
    },
    {
      stepLabel: "Pictures",
      stepComponent: (
        <AddPropertyImages
          images={images}
          isUploadingImages={isUploadingImages}
          setImages={setImages}
          key="propertyImages"
        />
      ),
    },
  ];

  return (
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
            disabled={isSavingDraft || isUploadingImages}
            variant="contained"
            disableElevation
            onClick={handleNext}
            endIcon={<KeyboardArrowRightIcon />}
          >
            {activeStep === 0 &&
              (isSavingDraft ? "Saving draft..." : "Save & Add Pictures")}
            {activeStep === 1 &&
              (isUploadingImages ? (
                <CustomCircularProgress value={imageUploadProgress} />
              ) : (
                "Publish"
              ))}
          </Button>
        }
      />
    </Box>
  );
};

export default AddProperty;
