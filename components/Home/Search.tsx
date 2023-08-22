import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useRouter } from "next/router";
import StyledSearchComponent from "../Shared/StyledSearchComponent";

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
      <StyledSearchComponent
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={() =>
          router.push(`/properties?searchValue=${searchValue}`)
        }
      />
    </Box>
  );
};

export default Search;
