import { ChangeEvent, FC, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextFieldWithoutLabel from "@/components/TextFields/TextFieldWithoutLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  AddPropertyPayload,
  PropertyPriceType,
  PropertyType,
} from "@/types/property";
import StyledTextArea from "@/components/TextFields/StyledTextArea";
import CustomAutoComplete from "@/components/Shared/CustomAutoComplete";
import { ILocation } from "@/types/shared";

interface IProps {
  propertyDetails: AddPropertyPayload;
  handleChange: (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>
  ) => void;
  handleCheckBox: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  locationOptions: readonly ILocation[];
  setLocationOptions: (options: readonly ILocation[]) => void;
  selectedLocationValue: ILocation | null;
  setSelectedLocationValue: (value: ILocation | null) => void;
  setLocationInputValue: (inputValue: string) => void;
}

const AddPropertyDetails: FC<IProps> = (props) => {
  return (
    <Box py={4} px={2} display="flex" flexDirection="column" gap={3}>
      <Grid spacing={3} container>
        <Grid display="flex" flexDirection="column" item xs={12} sm={7}>
          <label htmlFor="title">Title</label>
          <TextFieldWithoutLabel
            id="title"
            name="title"
            value={props.propertyDetails.title}
            onChange={props.handleChange}
            fullWidth
            required
            helperText={
              !props.propertyDetails.title.trim().length
                ? "Property title cannot be empty"
                : "Note: Do not add location information here"
            }
            error={!props.propertyDetails.title.trim().length}
            placeholder="e.g 3 Bedroom Flats with swimming pool"
          />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={5}>
          <label htmlFor="title">Property Type</label>
          <FormControl fullWidth>
            <Select
              labelId="property-type-select-label"
              id="property-type-select"
              name="propertyType"
              value={props.propertyDetails.propertyType}
              // label="Property Type"
              onChange={props.handleChange}
              required
            >
              <MenuItem value={PropertyType.Flat}>Flat</MenuItem>
              <MenuItem value={PropertyType.House}>House</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid spacing={3} container>
        <Grid display="flex" flexDirection="column" item xs={12} sm={6}>
          <label htmlFor="locality">Locality / Area / State</label>
          <CustomAutoComplete
            id="locality"
            name="locality"
            placeholder="Add locality/area"
            inputValue={props.propertyDetails.locality}
            setInputValue={props.setLocationInputValue}
            options={props.locationOptions}
            setOptions={props.setLocationOptions}
            selectedValue={props.selectedLocationValue}
            setSelectedValue={props.setSelectedLocationValue}
          />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={6}>
          <label htmlFor="street">Street / Road /Estate</label>
          <TextFieldWithoutLabel
            name="street"
            id="street"
            value={props.propertyDetails.street}
            onChange={props.handleChange}
            required
            helperText={
              !props.propertyDetails.street.trim().length
                ? "Property street/road cannot be empty"
                : ""
            }
            error={!props.propertyDetails.street.trim().length}
          />
        </Grid>
      </Grid>
      <Grid spacing={3} container>
        <Grid display="flex" flexDirection="column" item xs={12} sm={4}>
          <label htmlFor="Bedrooms">Number of Bedrooms</label>
          <TextFieldWithoutLabel
            type="number"
            id="Bedrooms"
            name="numberOfBedrooms"
            placeholder="e.g. 3"
            value={props.propertyDetails.numberOfBedrooms}
            onChange={props.handleChange}
            required
            helperText={
              !props.propertyDetails.numberOfBedrooms
                ? "Number of bedrooms must be a number greater than 0"
                : ""
            }
            error={!props.propertyDetails.numberOfBedrooms}
          />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={4}>
          <label htmlFor="Bathrooms">Number of Bathrooms</label>
          <TextFieldWithoutLabel
            type="number"
            id="Bathrooms"
            name="numberOfBathrooms"
            placeholder="e.g. 3"
            value={props.propertyDetails.numberOfBathrooms}
            onChange={props.handleChange}
            required
            helperText={
              !props.propertyDetails.numberOfBathrooms
                ? "Number of bathrooms must be a number greater than 0"
                : ""
            }
            error={!props.propertyDetails.numberOfBathrooms}
          />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={4}>
          <label htmlFor="Toilets">Number of Toilets</label>
          <TextFieldWithoutLabel
            type="number"
            id="Toilets"
            name="numberOfToilets"
            placeholder="e.g. 4"
            value={props.propertyDetails.numberOfToilets}
            onChange={props.handleChange}
            required
            helperText={
              !props.propertyDetails.numberOfToilets
                ? "Number of toilets must be a number greater than 0"
                : ""
            }
            error={!props.propertyDetails.numberOfToilets}
          />
        </Grid>
      </Grid>
      <Grid spacing={3} container>
        <Grid display="flex" flexDirection="column" item xs={12} sm={6}>
          <label htmlFor="Parking">Parking Space</label>
          <TextFieldWithoutLabel
            type="number"
            id="Parking"
            name="parkingSpace"
            placeholder="e.g. 5"
            value={props.propertyDetails.parkingSpace}
            onChange={props.handleChange}
            required
            helperText={
              !props.propertyDetails.parkingSpace
                ? "Parking space must be a number greater than 0"
                : ""
            }
            error={!props.propertyDetails.parkingSpace}
          />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={6}>
          <label htmlFor="LandArea">Total Land Area (Sqft)</label>
          <TextFieldWithoutLabel
            id="LandArea"
            placeholder="e.g. 500"
            name="totalLandArea"
            value={props.propertyDetails.totalLandArea}
            onChange={props.handleChange}
            required
            helperText={
              !props.propertyDetails.totalLandArea
                ? "Total land area must be a number greater than 0"
                : ""
            }
            error={!props.propertyDetails.totalLandArea}
          />
        </Grid>
      </Grid>
      <Grid spacing={3} container>
        <Grid display="flex" flexDirection="column" item xs={12} sm={6}>
          <label htmlFor="Price">Price (₦)</label>
          <TextFieldWithoutLabel
            id="Price"
            placeholder="e.g 500000"
            name="price"
            value={props.propertyDetails.price}
            onChange={props.handleChange}
            required
            helperText={
              !props.propertyDetails.price
                ? "Price must be a number greater than 0"
                : ""
            }
            error={!props.propertyDetails.price}
          />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={3}>
          <label htmlFor="title">Price Type</label>
          <FormControl fullWidth>
            <Select
              labelId="property-price-type-select-label"
              id="property-price-type-select"
              name="priceType"
              value={props.propertyDetails.priceType}
              // label="Property Type"
              onChange={props.handleChange}
              required
            >
              <MenuItem value={PropertyPriceType.PerAnnum}>Per Annum</MenuItem>
              <MenuItem value={PropertyPriceType.PerMonth}>Per Month</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
        <FormControlLabel
          control={
            <Checkbox onChange={props.handleCheckBox} name="furnished" />
          }
          label="Furnished"
        />
        <FormControlLabel
          control={<Checkbox onChange={props.handleCheckBox} name="serviced" />}
          label="Serviced"
        />
        <FormControlLabel
          control={<Checkbox onChange={props.handleCheckBox} name="shared" />}
          label="Shared"
        />
      </FormGroup>
      <Box sx={{ width: "100%" }} display="flex" flexDirection="column">
        <label htmlFor="Price">Description</label>
        <StyledTextArea
          sx={{
            width: "100%",
            p: 1,
            fontSize: "1.2em",
            resize: "none",
          }}
          name="description"
          value={props.propertyDetails.description}
          onChange={props.handleChange}
          minRows={6}
          maxRows={10}
          required
        />
      </Box>
    </Box>
  );
};

export default AddPropertyDetails;
