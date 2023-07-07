import React, { FC } from "react";
// import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { ILocation } from "@/types/shared";
import TextFieldWithLabel from "../TextFields/TextFieldWithLabel";

interface IProps {
  id?: string;
  name: string;
  placeholder: string;
  options: readonly ILocation[];
  setOptions: (options: readonly ILocation[]) => void;
  selectedValue: ILocation | null;
  setSelectedValue: (value: ILocation | null) => void;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
}
const CustomAutoComplete: FC<IProps> = (props) => {
  return (
    <Autocomplete
      id={props.id ?? "custom-autocomplete"}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.location
      }
      filterOptions={(x) => x}
      options={props.options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={props.selectedValue}
      noOptionsText="No localities"
      onChange={(event: any, newValue: ILocation | null) => {
        props.setOptions(
          newValue ? [newValue, ...props.options] : props.options
        );
        props.setSelectedValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        props.setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextFieldWithLabel
          name={props.name}
          {...params}
          label={props.placeholder}
          fullWidth
          helperText={
            !props.inputValue.trim().length
              ? "Property location cannot be empty"
              : ""
          }
          error={!props.inputValue.trim().length}
        />
      )}
    />
  );
};

export default CustomAutoComplete;
