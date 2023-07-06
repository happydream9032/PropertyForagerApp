import React, { FC } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

const PropertiesList: FC = () => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Box py={6} px={6}>
      <PrimaryButton
        disableElevation
        sx={{ textTransform: "none" }}
        variant="contained"
        endIcon={
          <AddIcon
            sx={{
              width: "1.5rem",
              height: "1.5rem",
              //   backgroundColor: theme.palette.primary.dark,
            }}
          />
        }
        onClick={() => router.push("/backoffice/properties/add")}
      >
        Add Property
      </PrimaryButton>
      <Grid container></Grid>
    </Box>
  );
};

export default PropertiesList;
