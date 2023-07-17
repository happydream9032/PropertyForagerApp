import React, { FC, useEffect, useMemo } from "react";
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
        typeof option === "string" ? option : option.location
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={selectedValue}
      noOptionsText="No localities"
      onChange={(event: any, newValue: ILocation | null) => {
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
