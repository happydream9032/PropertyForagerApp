import React, { FC } from "react";
// import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextFieldWithLabel from "../TextFields/TextFieldWithLabel";

interface IProps {
  id?: string;
  name: string;
  placeholder: string;
  options: readonly string[];
  setOptions: (options: readonly string[]) => void;
  selectedValue: string | null;
  setSelectedValue: (value: string | null) => void;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
}
const CustomAutoComplete: FC<IProps> = ({
  inputValue,
  name,
  options,
  placeholder,
  selectedValue,
  setInputValue,
  setOptions,
  setSelectedValue,
  id,
}) => {
  return (
    <Autocomplete
      id={id ?? "custom-autocomplete"}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={selectedValue}
      noOptionsText="No localities"
      onChange={(event: any, newValue: string | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setSelectedValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextFieldWithLabel
          name={name}
          {...params}
          placeholder={placeholder}
          fullWidth
          helperText={
            !inputValue.trim().length ? "This field cannot be empty" : ""
          }
          required
          error={!inputValue.trim().length}
        />
      )}
    />
  );
};

export default CustomAutoComplete;
