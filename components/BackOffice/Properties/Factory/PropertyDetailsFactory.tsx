import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
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
import { _saveDraft, _searchLocations } from "@/services/propertyService";
import Snackbar from "@mui/material/Snackbar";

interface IProps {
  propertyDetails: AddPropertyPayload;
  setPropertyDetails: React.Dispatch<React.SetStateAction<AddPropertyPayload>>;
}

const PropertyDetailsFactory: FC<IProps> = ({
  propertyDetails,
  setPropertyDetails,
}) => {
  const throttle = useRef(false);

  const [selectedLocationValue, setSelectedLocationValue] = useState<
    string | null
  >(null);
  const [locationOptions, setLocationOptions] = useState<readonly string[]>([]);
  const [response, setResponse] = useState({
    error: false,
    success: false,
    message: "",
  });

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>
  ) => {
    if (e.target.name === "totalLandArea" || e.target.name === "price") {
      setPropertyDetails({
        ...propertyDetails,
        [e.target.name]: Number(e.target.value),
      });
    } else {
      setPropertyDetails({
        ...propertyDetails,
        [e.target.name]: e.target.value,
      });
    }
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

  useEffect(() => {
    let active = true;
    if (propertyDetails.locality === "") {
      setLocationOptions(selectedLocationValue ? [selectedLocationValue] : []);
      return undefined;
    }

    if (throttle.current) {
      return;
    }

    throttle.current = true;
    setTimeout(() => {
      throttle.current = false;
      _searchLocations(propertyDetails.locality)
        .then((response) => {
          const locations = response.data.data.map(
            ({ location }: ILocation) => location
          );
          setLocationOptions(locations);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }, 500);

    return () => {
      active = false;
    };
  }, [setLocationOptions, propertyDetails.locality, selectedLocationValue]);

  return (
    <Box py={4} px={2} display="flex" flexDirection="column" gap={3}>
      <Snackbar
        open={response.message.length > 0}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        autoHideDuration={3000}
        message={response.message}
      />

      <Grid spacing={3} container>
        <Grid display="flex" flexDirection="column" item xs={12} sm={7}>
          <label htmlFor="title">Title</label>
          <TextFieldWithoutLabel
            id="title"
            name="title"
            value={propertyDetails.title}
            onChange={handleChange}
            fullWidth
            required
            helperText={
              !propertyDetails.title.trim().length
                ? "Property title cannot be empty"
                : "Note: Do not add location information here"
            }
            error={!propertyDetails.title.trim().length}
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
              value={propertyDetails.propertyType}
              // label="Property Type"
              onChange={handleChange}
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
            inputValue={propertyDetails.locality}
            setInputValue={setLocationInputValue}
            options={locationOptions}
            setOptions={setLocationOptions}
            selectedValue={selectedLocationValue || propertyDetails.locality}
            setSelectedValue={setSelectedLocationValue}
          />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={6}>
          <label htmlFor="street">Street / Road /Estate</label>
          <TextFieldWithoutLabel
            name="street"
            id="street"
            value={propertyDetails.street}
            onChange={handleChange}
            required
            helperText={
              !propertyDetails.street.trim().length
                ? "Property street/road cannot be empty"
                : ""
            }
            error={!propertyDetails.street.trim().length}
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
            value={propertyDetails.numberOfBedrooms}
            onChange={handleChange}
            required
            helperText={
              !propertyDetails.numberOfBedrooms
                ? "Number of bedrooms must be a number greater than 0"
                : ""
            }
            error={!propertyDetails.numberOfBedrooms}
          />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={4}>
          <label htmlFor="Bathrooms">Number of Bathrooms</label>
          <TextFieldWithoutLabel
            type="number"
            id="Bathrooms"
            name="numberOfBathrooms"
            placeholder="e.g. 3"
            value={propertyDetails.numberOfBathrooms}
            onChange={handleChange}
            required
            helperText={
              !propertyDetails.numberOfBathrooms
                ? "Number of bathrooms must be a number greater than 0"
                : ""
            }
            error={!propertyDetails.numberOfBathrooms}
          />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={4}>
          <label htmlFor="Toilets">Number of Toilets</label>
          <TextFieldWithoutLabel
            type="number"
            id="Toilets"
            name="numberOfToilets"
            placeholder="e.g. 4"
            value={propertyDetails.numberOfToilets}
            onChange={handleChange}
            required
            helperText={
              !propertyDetails.numberOfToilets
                ? "Number of toilets must be a number greater than 0"
                : ""
            }
            error={!propertyDetails.numberOfToilets}
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
            value={propertyDetails.parkingSpace}
            onChange={handleChange}
            required
            helperText={
              !propertyDetails.parkingSpace
                ? "Parking space must be a number greater than 0"
                : ""
            }
            error={!propertyDetails.parkingSpace}
          />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={6}>
          <label htmlFor="LandArea">Total Land Area (Sqft)</label>
          <TextFieldWithoutLabel
            id="LandArea"
            placeholder="e.g. 500"
            name="totalLandArea"
            value={propertyDetails.totalLandArea}
            onChange={handleChange}
            required
            helperText={
              !propertyDetails.totalLandArea
                ? "Total land area must be a number greater than 0"
                : ""
            }
            error={!propertyDetails.totalLandArea}
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
            value={propertyDetails.price}
            onChange={handleChange}
            required
            helperText={
              !propertyDetails.price
                ? "Price must be a number greater than 0"
                : ""
            }
            error={!propertyDetails.price}
          />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} sm={3}>
          <label htmlFor="title">Price Type</label>
          <FormControl fullWidth>
            <Select
              labelId="property-price-type-select-label"
              id="property-price-type-select"
              name="priceType"
              value={propertyDetails.priceType}
              // label="Property Type"
              onChange={handleChange}
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
            <Checkbox
              checked={propertyDetails.furnished}
              onChange={handleCheckBox}
              name="furnished"
            />
          }
          label="Furnished"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={propertyDetails.serviced}
              onChange={handleCheckBox}
              name="serviced"
            />
          }
          label="Serviced"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={propertyDetails.shared}
              onChange={handleCheckBox}
              name="shared"
            />
          }
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
          value={propertyDetails.description}
          onChange={handleChange}
          minRows={6}
          maxRows={10}
          required
        />
      </Box>
    </Box>
  );
};

export default PropertyDetailsFactory;
