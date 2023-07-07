import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { IStepperProps } from "@/types/shared";

const CustomStepper: React.FC<IStepperProps> = ({
  activeStep,
  steps,
  backButtonElement,
  nextButtonElement,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{step.stepLabel}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        {steps.map((step, index) =>
          activeStep === index ? (
            <React.Fragment key={index}>{step.stepComponent}</React.Fragment>
          ) : null
        )}
      </React.Fragment>
      <React.Fragment>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          {backButtonElement}
          <Box sx={{ flex: "1 1 auto" }} />
          {nextButtonElement}
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default CustomStepper;
