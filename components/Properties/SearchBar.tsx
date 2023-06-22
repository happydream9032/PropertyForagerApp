import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import TextFieldWithLabel from "../TextFields/TextFieldWithLabel";
import { PropertyType } from "@/types/property";
import { propertyPrices } from "@/utils/prices";
import PrimaryButton from "../Buttons/PrimaryButton";
import { ChangeEvent, FC, FormEventHandler } from "react";

interface IProps {
  searchKeyword: string;
  propertyType: PropertyType;
  numberOfBedrooms: number;
  maximumPrice: number;
  minimumPrice: number;
  furnished: boolean;
  serviced: boolean;
  shared: boolean;
  handleChange: (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>
  ) => void;
  handleCheckBox: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  handleSearch: FormEventHandler<HTMLFormElement>;
  isSearching: boolean;
}
const SearchBar: FC<Partial<IProps>> = (props) => {
  return (
    <Box
      onSubmit={props.handleSearch}
      display="flex"
      flexDirection="column"
      component="form"
    >
      <Box>
        <Typography>Advanced Search Filters</Typography>
      </Box>
      <Box gap={2} display="flex" flexDirection="column">
        <Box>
          <TextFieldWithLabel
            name="searchKeyword"
            onChange={props.handleChange}
            value={props.searchKeyword}
            label="Location"
            fullWidth
          />
        </Box>
        <Box gap={3} display="flex">
          <FormControl fullWidth>
            <InputLabel id="property-type-select-label">
              Property Type
            </InputLabel>
            <Select
              labelId="property-type-select-label"
              id="property-type-select"
              name="propertyType"
              value={props.propertyType}
              label="Property Type"
              onChange={props.handleChange}
            >
              <MenuItem value={PropertyType.Flat}>Flat</MenuItem>
              <MenuItem value={PropertyType.House}>House</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="bedrooms-number-select-label">Bedrooms</InputLabel>
            <Select
              labelId="bedrooms-number-select-label"
              id="bedrooms-number-select"
              name="numberOfBedrooms"
              value={props.numberOfBedrooms}
              label="Bedrooms"
              onChange={props.handleChange}
            >
              {Array.from(new Array(6)).map((_, index) => (
                <MenuItem key={index} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box gap={3} display="flex">
          <FormControl fullWidth>
            <InputLabel id="minimum-price-select-label">
              Minimum Price
            </InputLabel>
            <Select
              labelId="minimum-price-select-label"
              id="minimum-price-select"
              name="minimumPrice"
              value={props.minimumPrice}
              label="Minimum Price"
              onChange={props.handleChange}
            >
              {propertyPrices.map((price, index) => (
                <MenuItem key={index} value={price.actualValue}>
                  {price.displayValue}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="maximum-price-select-label">
              Maximum Price
            </InputLabel>
            <Select
              labelId="maximum-price-select-label"
              id="maximum-price-select"
              name="maximumPrice"
              value={props.maximumPrice}
              label="Maximum Price"
              onChange={props.handleChange}
            >
              {propertyPrices.map((price, index) => (
                <MenuItem key={index} value={price.actualValue}>
                  {price.displayValue}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox onChange={props.handleCheckBox} name="furnished" />
              }
              label="Furnished"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={props.handleCheckBox} name="serviced" />
              }
              label="Serviced"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={props.handleCheckBox} name="shared" />
              }
              label="Shared"
            />
          </FormGroup>
        </Box>
      </Box>
      <Box>
        <PrimaryButton
          disabled={props.isSearching}
          variant="contained"
          fullWidth
          type="submit"
        >
          {props.isSearching ? "Searching..." : "Search"}
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default SearchBar;
