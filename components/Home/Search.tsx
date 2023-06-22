import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useRouter } from "next/router";

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

const Search = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography fontWeight={400} variant="body1" component="p">
        We believe there&apos;s a perfect home for everybody, no matter the
        budget.
        <br /> Let us help you find your dream home
      </Typography>
      <StyledSearchBox
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/properties?searchValue=${searchValue}`);
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
          }}
          size="medium"
          type="submit"
          disableElevation
          variant="contained"
        >
          Search
        </PrimaryButton>
      </StyledSearchBox>
    </Box>
  );
};

export default Search;
