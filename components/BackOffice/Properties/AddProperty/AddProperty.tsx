import React, { ChangeEvent, useState } from "react";
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
import { getPropertyAdditionValidationSchema } from "@/utils/validationSchema";
import { _addProperty, _saveDraft } from "@/services/propertyService";
import useAuthData from "@/components/Shared/useAuthData";
import AlertComponent from "@/components/Alerts/AlertComponent";

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
  const { authData } = useAuthData();
  const [activeStep, setActiveStep] = useState(0);
  const [propertyDetails, setPropertyDetails] = useState<AddPropertyPayload>(
    initialPropertyDetailsPayloadState
  );
  const [selectedLocationValue, setSelectedLocationValue] =
    useState<ILocation | null>(null);
  const [locationOptions, setLocationOptions] = React.useState<
    readonly ILocation[]
  >([]);
  const [response, setResponse] = useState({
    error: false,
    success: false,
    message: "",
  });
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isPublishingProperty, setIsPublishingProperty] = useState(false);

  const handleNext = () => {
    if (activeStep === steps.length - 2) {
      saveDraft();
    } else if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>
  ) => {
    setPropertyDetails({ ...propertyDetails, [e.target.name]: e.target.value });
  };

  const handleCheckBox = (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setPropertyDetails({ ...propertyDetails, [e.target.name]: checked });
  };

  const setLocationInputValue = (input: string) => {
    setPropertyDetails({ ...propertyDetails, locality: input });
  };

  async function validatePropertyDetailsInputs(data: AddPropertyPayload) {
    const schema = getPropertyAdditionValidationSchema();
    const validatedData = await schema.validate(data);
    return validatedData;
  }

  async function saveDraft() {
    setIsSavingDraft(true);
    try {
      const validatedInputs = await validatePropertyDetailsInputs(
        propertyDetails
      );
      const res = await _saveDraft(validatedInputs, authData!.token);
      setIsSavingDraft(false);
      if (res.status !== 200 && res.status !== 201) {
        setResponse({ ...response, error: true, message: res.data.Message });
        return;
      }
      setResponse({
        ...response,
        success: true,
        message: `Property successfully saved as draft`,
      });
      setActiveStep((activeStep) => activeStep + 1);
      return;
    } catch (error) {
      setIsSavingDraft(false);
      setResponse({
        ...response,
        error: true,
        success: false,
        message: "Something went wrong on our end. Please try again.",
      });
    } finally {
      setTimeout(() => {
        setResponse({ error: false, success: false, message: "" });
      }, 9000);
    }
  }

  async function handleSubmit() {
    return;
    setIsPublishingProperty(true);
    try {
      const validatedInputs = await validatePropertyDetailsInputs(
        propertyDetails
      );
      const res = await _addProperty(validatedInputs, authData!.token);
      setIsPublishingProperty(false);
      if (res.status !== 200 && res.status !== 201) {
        setResponse({ ...response, error: true, message: res.data.Message });
        return;
      }
      setResponse({
        ...response,
        success: true,
        message: `Property successfully added`,
      });
    } catch (error) {
      setIsPublishingProperty(false);
      setResponse({
        ...response,
        error: true,
        success: false,
        message: "Something went wrong on our end. Please try again.",
      });
    } finally {
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
          handleChange={handleChange}
          handleCheckBox={handleCheckBox}
          locationOptions={locationOptions}
          propertyDetails={propertyDetails}
          selectedLocationValue={selectedLocationValue}
          setLocationInputValue={setLocationInputValue}
          setLocationOptions={setLocationOptions}
          setSelectedLocationValue={setSelectedLocationValue}
        />
      ),
    },
    {
      stepLabel: "Pictures",
      stepComponent: <AddPropertyImages />,
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
            disabled={isSavingDraft || isPublishingProperty}
            variant="contained"
            disableElevation
            onClick={handleNext}
            endIcon={<KeyboardArrowRightIcon />}
          >
            {activeStep === steps.length - 2
              ? isSavingDraft
                ? "Saving draft..."
                : "Save and Continue"
              : activeStep === steps.length - 1
              ? isPublishingProperty
                ? "Publishing property..."
                : "Publish"
              : "Next"}
          </Button>
        }
      />
    </Box>
  );
};

export default AddProperty;
