import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Theme, useTheme } from "@mui/material/styles";
import LocationIcon from "@mui/icons-material/LocationOnOutlined";
import BedroomIcon from "@mui/icons-material/BedroomParentOutlined";
import BathroomIcon from "@mui/icons-material/BathroomOutlined";
import { PropertyOverview, PropertyPriceType } from "@/types/property";
import Link from "next/link";
import { IAuthenticateResponse } from "@/types/user";
import PrimaryButton from "../Buttons/PrimaryButton";
import { isOrdinaryUser } from "@/utils/functions";
import { useRouter } from "next/router";
import { _deleteProperty } from "@/services/propertyService";
import SimpleDialog from "../Modals/SimpleDialog";

interface IProps extends React.PropsWithChildren {
  theme: Theme;
  href: string;
}
const PropertyDetailsCardWrapper: FC<IProps> = ({ children, theme, href }) => {
  return window.location.pathname === "/backoffice/properties" ? (
    <Box
      sx={{
        textDecoration: "none",
      }}
    >
      {children}
    </Box>
  ) : (
    <Box
      sx={{
        cursor: "pointer",
        textDecoration: "none",
        ":hover": {
          transform: "scale(1.03)",
          transitionProperty: "transform",
          transitionTimingFunction: theme.transitions.easing.easeInOut,
          transitionDuration: "150ms",
        },
      }}
      href={href}
      component={Link}
    >
      {children}
    </Box>
  );
};

const PropertyDisplayCard: FC<
  PropertyOverview & { authData: IAuthenticateResponse | null }
> = (props) => {
  const theme = useTheme();
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const handlePropertyDelete = async (propertyId: string) => {
    if (!props.authData) return;
    setIsDeleting(true);
    try {
      const response = await _deleteProperty(propertyId, props.authData.token);
      setMessage(response.data.Message);
    } catch (error) {
      setMessage("Oops! We encountered an error while deleting property");
    } finally {
      setIsDeleting(false);
      setTimeout(() => {
        setMessage("");
        router.reload();
      }, 4000);
    }
  };

  const closeModal = () => setOpenModal(false);

  return (
    <PropertyDetailsCardWrapper
      key="PropertyDetailsCard"
      theme={theme}
      href={`/property/${props.id}`}
    >
      <Box
        sx={{
          backgroundImage: `url("${props.images[0]?.imageURL}")`,
          width: "100%",
          height: "250px",
          objectFit: "scale-down",
          borderRadius: "0.5rem",
          backgroundSize: "cover",
          backgroundColor: theme.palette.primary.main,
        }}
      ></Box>
      <Paper
        elevation={4}
        sx={{
          width: "95%",
          height: "fit-content",
          mx: "auto",
          mt: -6,
          borderRadius: "0.5rem",
          padding: "1rem",
        }}
      >
        <Typography
          sx={{
            width: "inherit",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          fontWeight={500}
          variant="h4"
          component="h4"
        >
          {props.title}
        </Typography>
        {props.description && (
          <Typography
            sx={{
              width: "inherit",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="body1"
            component="p"
            my={2}
          >
            {props.description}
          </Typography>
        )}
        <Typography
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            padding: "0.4rem",
            borderRadius: "0.3rem",
            width: "fit-content",
          }}
          my={2}
          variant="h6"
          fontWeight={500}
        >
          ₦{props.price.toLocaleString("en")} per{" "}
          {props.priceType == PropertyPriceType.PerAnnum ? "annum" : "month"}
        </Typography>
        <Stack
          my={2}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{
            border: `3px solid ${theme.palette.grey[300]}`,
            borderRadius: "5px",
            padding: "10px",
            // flexDirection: { xs: "column", sm: "row" },
          }}
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "column" },
              // flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              color={theme.palette.grey[800]}
              fontWeight={500}
              variant="body1"
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Bedrooms
            </Typography>
            <BedroomIcon
              fontSize="large"
              sx={{
                display: { xs: "block", sm: "none" },
                color: theme.palette.grey[700],
              }}
            />
            <Typography
              fontSize="1rem"
              fontWeight={700}
              variant="body1"
              component="strong"
            >
              {props.numberOfBedrooms}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "column" },
              // flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              color={theme.palette.grey[800]}
              fontWeight={500}
              variant="body1"
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Bathrooms
            </Typography>
            <BathroomIcon
              fontSize="large"
              sx={{
                display: { xs: "block", sm: "none" },
                color: theme.palette.grey[700],
              }}
            />
            <Typography
              fontSize="1rem"
              fontWeight={700}
              variant="body1"
              component="strong"
            >
              {props.numberOfBathrooms}
            </Typography>
          </Box>
          <Box
            sx={{
              display: !props.totalLandArea ? "none" : "flex",
              // flexDirection: { xs: "row", sm: "column" },
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              color={theme.palette.grey[800]}
              fontWeight={500}
              variant="body1"
              component="span"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Total Space
            </Typography>
            <Typography
              fontSize="1rem"
              fontWeight={700}
              variant="body1"
              component="strong"
            >
              {props.totalLandArea} ft<sup>2</sup>
            </Typography>
          </Box>
        </Stack>
        <Typography gap={1} display="flex" alignItems="center" mt={1}>
          <LocationIcon color="primary" />{" "}
          <Typography fontWeight={500} variant="body1" component="strong">
            {props.street},{props.locality}
          </Typography>
        </Typography>
        {props.authData && !isOrdinaryUser(props.authData) && (
          <Box pt={2}>
            <Divider sx={{ my: 1 }} />
            <PrimaryButton
              disableElevation
              sx={{
                borderRadius: "0.6rem",
                my: 2,
                ":hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                },
              }}
              fullWidth
              variant="outlined"
              onClick={() => router.push(`/property/${props.id}`)}
            >
              View Details
            </PrimaryButton>
            <Box display="flex" gap={2} justifyContent="space-between">
              <PrimaryButton
                disableElevation
                sx={{
                  borderRadius: "0.6rem",
                  color: theme.palette.primary.main,
                  backgroundColor: "rgba(64,87,109,.07)",
                  ":hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                  },
                }}
                fullWidth
                variant="contained"
                onClick={() =>
                  router.push(
                    `/backoffice/properties/edit?propertyId=${props.id}`
                  )
                }
              >
                Edit
              </PrimaryButton>
              <PrimaryButton
                disableElevation
                sx={{
                  borderRadius: "0.6rem",
                  color: "red",
                  backgroundColor: "rgba(64,87,109,.07)",
                  ":hover": { backgroundColor: "red", color: "white" },
                }}
                fullWidth
                variant="contained"
                onClick={() => setOpenModal(true)}
              >
                Delete
              </PrimaryButton>
            </Box>
          </Box>
        )}
      </Paper>
      <SimpleDialog
        modalTitle="Delete Property"
        open={openModal}
        handleClose={closeModal}
      >
        {message && (
          <Typography fontWeight={500} color="red">
            {message}
          </Typography>
        )}
        <Typography>Are you sure you want to delete this property?</Typography>
        <Box pt={3} display="flex" gap={2} justifyContent="space-between">
          <PrimaryButton
            disableElevation
            sx={{
              borderRadius: "0.6rem",
            }}
            fullWidth
            variant="contained"
            onClick={closeModal}
          >
            Cancel
          </PrimaryButton>
          <PrimaryButton
            disableElevation
            sx={{
              borderRadius: "0.6rem",
              color: "red",
              backgroundColor: "rgba(64,87,109,.07)",
              ":hover": { backgroundColor: "red", color: "white" },
            }}
            disabled={isDeleting || !props.authData}
            fullWidth
            variant="contained"
            onClick={() => handlePropertyDelete(props.id)}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </PrimaryButton>
        </Box>
      </SimpleDialog>
    </PropertyDetailsCardWrapper>
  );
};

export default PropertyDisplayCard;
