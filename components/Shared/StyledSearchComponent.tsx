import { styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import PrimaryButton from "../Buttons/PrimaryButton";
import { FC } from "react";

const StyledSearchInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  padding: "0.5rem",
  "& .MuiInputBase-input": {
    "::placeholder": {
      color: "#212121",
      fontWeight: 600,
    },
  },
}));

const StyledSearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: 1,
  borderRadius: "3rem",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
  border: "1px solid #212121",
  padding: theme.spacing(0.5),
  paddingLeft: theme.spacing(2),
}));

interface IProps {
  handleSearch: Function;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  showSearchButton?: boolean;
}

const StyledSearchComponent: FC<IProps> = ({
  handleSearch,
  searchValue,
  setSearchValue,
  showSearchButton = true,
}) => {
  return (
    <StyledSearchBox
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      component="form"
    >
      <SearchIcon
        sx={{
          color: "#212121",
          width: "2rem",
          height: "2rem",
        }}
      />
      <StyledSearchInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={{ width: "100%", ":-moz-placeholder": { color: "red" } }}
        placeholder="Enter a state, city or locality"
      />

      <PrimaryButton
        sx={{
          borderRadius: "2rem",
          py: "0.7rem",
          px: "2rem",
          textTransform: "none",
          display: !showSearchButton ? "none" : "block",
        }}
        size="medium"
        type="submit"
        disableElevation
        variant="contained"
      >
        Search
      </PrimaryButton>
    </StyledSearchBox>
  );
};

export default StyledSearchComponent;
