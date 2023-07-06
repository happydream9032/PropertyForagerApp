import React, { useState } from "react";
import Box from "@mui/material/Box";
import CustomStepper from "@/components/Shared/CustomStepper";
import Grid from "@mui/material/Grid";
import TextFieldWithoutLabel from "@/components/TextFields/TextFieldWithoutLabel";
import { PropertyType } from "@/types/property";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Steps } from "@/types/shared";

const PropertyDetails = () => {
  return (
    <Box py={4} px={6} display="flex" flexDirection="column" gap={3}>
      <Grid spacing={3} container>
        <Grid display="flex" flexDirection="column" item xs={12} sm={7}>
          <label htmlFor="title">Title</label>
          <TextFieldWithoutLabel
            id="title"
            fullWidth
            placeholder="e.g 3 Bedroom Flats with swimming pool"
          />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={5}>
          <label htmlFor="title">Title</label>
          <FormControl fullWidth>
            <InputLabel id="property-type-select-label">
              Property Type
            </InputLabel>
            <Select
              labelId="property-type-select-label"
              id="property-type-select"
              name="propertyType"
              //   value={props.propertyType}
              label="Property Type"
              //   onChange={props.handleChange}
            >
              <MenuItem value={PropertyType.Flat}>Flat</MenuItem>
              <MenuItem value={PropertyType.House}>House</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid spacing={3} container>
        <Grid display="flex" flexDirection="column" item xs={12} sm={6}>
          <label htmlFor="locality">Locality / Area /State</label>
          <TextFieldWithoutLabel id="locality" />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={6}>
          <label htmlFor="street">Street / Road /Estate</label>
          <TextFieldWithoutLabel id="street" />
        </Grid>
      </Grid>
      <Grid spacing={3} container>
        <Grid display="flex" flexDirection="column" item xs={12} sm={4}>
          <label htmlFor="Bedrooms">Bedrooms</label>
          <TextFieldWithoutLabel type="number" id="Bedrooms" />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={4}>
          <label htmlFor="Bathrooms">Bathrooms</label>
          <TextFieldWithoutLabel type="number" id="Bathrooms" />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={4}>
          <label htmlFor="Toilets">Toilets</label>
          <TextFieldWithoutLabel type="number" id="Toilets" />
        </Grid>
      </Grid>
      <Grid spacing={3} container>
        <Grid display="flex" flexDirection="column" item xs={12} sm={6}>
          <label htmlFor="Parking">Parking Space</label>
          <TextFieldWithoutLabel type="number" id="Parking" />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={6}>
          <label htmlFor="LandArea">Total Land Area</label>
          <TextFieldWithoutLabel type="number" id="LandArea" />
        </Grid>
      </Grid>
      <Box
        sx={{ width: { xs: "100%", sm: "50%" } }}
        display="flex"
        flexDirection="column"
      >
        <label htmlFor="Price">Price (₦)</label>
        <TextFieldWithoutLabel
          //   sx={{ width: "rem" }}
          id="Price"
          placeholder="e.g 500000"
        />
      </Box>
      <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
        <FormControlLabel
          control={<Checkbox name="furnished" />}
          label="Furnished"
        />
        <FormControlLabel
          control={<Checkbox name="serviced" />}
          label="Serviced"
        />
        <FormControlLabel control={<Checkbox name="shared" />} label="Shared" />
      </FormGroup>
    </Box>
  );
};

const AddProperty = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps: Steps[] = [
    {
      stepLabel: "Property Details",
      stepComponent: <PropertyDetails />,
    },
    {
      stepLabel: "Pictures",
      stepComponent: <PropertyDetails />,
    },
    {
      stepLabel: "Finish",
      stepComponent: <PropertyDetails />,
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {};

  return (
    <Box py={6} px={6}>
      <CustomStepper
        activeStep={activeStep}
        handleBack={handleBack}
        handleNext={handleNext}
        handleFinish={handleSubmit}
        steps={steps}
      />
    </Box>
  );
};

export default AddProperty;
