import {
  ListPropertiesRequest,
  PropertiesList,
  PropertyType,
} from "@/types/property";
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropertyDisplayCard from "../Shared/PropertyDisplayCard";
import { _getPropertiesList } from "@/services/propertyService";
import PropertiesLoader from "../Shared/PropertiesLoader";
import { useRouter } from "next/router";
import SearchBar from "./SearchBar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import SecondaryButton from "../Buttons/SecondaryButton";
import { ChevronLeft } from "@mui/icons-material";
import { SelectChangeEvent, Snackbar, Typography } from "@mui/material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const initialSearchParams = {
  searchKeyword: "",
  propertyType: PropertyType.Flat,
  numberOfBedrooms: 2,
  maximumPrice: 800000,
  minimumPrice: 500000,
};

const PropertiesList: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [propertiesList, setPropertiesList] = useState<PropertiesList>([]);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [searchParams, setSearchParams] = useState<ListPropertiesRequest>({
    ...initialSearchParams,
    searchKeyword: router.query.searchValue?.toString(),
  });
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState({ show: false, message: "" });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await _getPropertiesList({
        searchKeyword: router.query.searchValue?.toString(),
      });
      const propertiesData = response.data.data;
      setPropertiesList(propertiesData);
      setIsLoading(false);
    })();
  }, [router.query?.searchValue]);

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>
  ) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleCheckBox = (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setSearchParams({ ...searchParams, [e.target.name]: checked });
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const response = await _getPropertiesList(searchParams);
      if (response.status !== 200) {
        setIsSearching(false);
        setSearchError({ show: true, message: response.statusText });
        return;
      }
      const propertiesData = response.data.data;
      setPropertiesList(propertiesData);
      setIsSearching(false);
      setOpenSideBar(false);
    } catch (error) {
      setIsSearching(false);
      setSearchError({
        show: true,
        message:
          "We encountered an error while processing your request. Please try again",
      });
    }
  };

  return (
    <Box
      mt={2}
      sx={{
        py: 2,
        flexDirection: { xs: "column", md: "row" },
        px: { xs: 2, sm: 6 },
        position: "relative",
      }}
    >
      {searchError.show && searchError.message.length && (
        <Snackbar autoHideDuration={3000} message={searchError.message} />
      )}
      <SecondaryButton
        disableElevation
        translate="yes"
        sx={{
          position: "fixed",
          zIndex: 100,
          borderRadius: "2rem",
          textTransform: "none",
        }}
        variant="contained"
        onClick={() => setOpenSideBar(true)}
      >
        Show filters
      </SecondaryButton>

      {isLoading ? (
        <PropertiesLoader />
      ) : (
        <Grid mt={2} spacing={4} container>
          {propertiesList.length ? (
            propertiesList.map((p) => (
              <Grid xs={12} md={6} lg={4} item key={p.id}>
                <PropertyDisplayCard
                  authData={null}
                  id={p.id}
                  images={p.images}
                  locality={p.locality}
                  numberOfBathrooms={p.numberOfBathrooms}
                  numberOfBedrooms={p.numberOfBedrooms}
                  price={p.price}
                  priceType={p.priceType}
                  street={p.street}
                  title={p.title}
                  description={p.description}
                  totalLandArea={p.totalLandArea}
                />
              </Grid>
            ))
          ) : (
            <Grid xs={12} item>
              <Typography fontWeight={600} textAlign="center">
                Properties not found!
              </Typography>
            </Grid>
          )}
        </Grid>
      )}

      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: { xs: "70%", sm: "50%", md: "40%" },
            top: "82px",
            boxSizing: "border-box",
            py: "1rem",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openSideBar}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpenSideBar(false)}>
            <ChevronLeft fontSize="large" />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box p={4} sx={{ width: "100%" }}>
          <SearchBar
            {...searchParams}
            isSearching={isSearching}
            handleChange={handleChange}
            handleSearch={handleSearch}
            handleCheckBox={handleCheckBox}
          />
        </Box>
      </Drawer>
    </Box>
  );
};

export default PropertiesList;
