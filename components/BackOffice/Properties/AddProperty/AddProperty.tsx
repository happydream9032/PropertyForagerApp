import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Box from "@mui/material/Box";
import CustomStepper from "@/components/Shared/CustomStepper";
import { ILocation, Steps } from "@/types/shared";
import AddPropertyDetails from "./AddPropertyDetails";
import AddPropertyImages from "./AddPropertyImages";
import FinalizePropertyAddition from "./FinalizePropertyAddition";
import {
  AddPropertyPayload,
  PropertyPriceType,
  PropertyType,
} from "@/types/property";
import { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  _addProperty,
  _saveDraft,
  _uploadPropertyImages,
} from "@/services/propertyService";
import useAuthData from "@/components/Shared/useAuthData";
import AlertComponent from "@/components/Alerts/AlertComponent";

const AddProperty = () => {
  const { authData } = useAuthData();
  const [activeStep, setActiveStep] = useState(0);
  const [propertyId, setPropertyId] = useState("");
  const [initiateSaveDetailsRequest, setInitiateSaveDetailsRequest] =
    useState(false);
  const [startImageUpload, setStartImageUpload] = useState(false);

  const [response, setResponse] = useState({
    error: false,
    success: false,
    message: "",
  });
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  const handleNext = () => {
    if (activeStep !== 0) return;
    return setInitiateSaveDetailsRequest(true);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps: Steps[] = [
    {
      stepLabel: "Property Details",
      stepComponent: (
        <AddPropertyDetails
          initiateSaveDetailsRequest={initiateSaveDetailsRequest}
          setInitiateSaveDetailsRequest={setInitiateSaveDetailsRequest}
          setPropertyId={(propertyId) => setPropertyId(propertyId)}
          setActiveStep={setActiveStep}
          authData={authData}
          setIsSavingDraft={setIsSavingDraft}
        />
      ),
    },
    {
      stepLabel: "Pictures",
      stepComponent: (
        <AddPropertyImages
          propertyId={propertyId}
          startImageUpload={startImageUpload}
        />
      ),
    },
    {
      stepLabel: "Finish",
      stepComponent: <FinalizePropertyAddition />,
    },
  ];

  return (
    <Box py={6} px={6}>
      {(response.error || response.success) && Boolean(response.message) && (
        <AlertComponent
          severity={response.error ? "error" : "success"}
          message={response.message}
        />
      )}
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
              (isUploadingImages ? "Publishing property..." : "Publish")}
          </Button>
        }
      />
    </Box>
  );
};

export default AddProperty;
