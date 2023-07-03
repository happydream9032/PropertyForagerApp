import React, { FC } from "react";
import { IProperty } from "@/types/property";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextFieldWithoutLabel from "@/components/TextFields/TextFieldWithoutLabel";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

const ContactAgent: FC<IProperty> = (props) => {
  return (
    <Box
      px={4}
      py={12}
      display="flex"
      gap={6}
      sx={{
        width: "100%",
        flexDirection: { xs: "column-reverse", sm: "row" },
        alignItems: { xs: "center", sm: "flex-start" },
      }}
    >
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: { xs: "100%", sm: "40%" },
        }}
      >
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(180deg, rgba(40, 46, 56, 0), rgba(40, 46, 56, 0) 51%, rgba(40, 46, 56, 0.75) 72%)",
            zIndex: 1,
            position: "absolute",
            top: "0%",
            bottom: "0%",
            left: "0%",
            right: "0%",
            borderRadius: "1rem",
          }}
        ></Box>
        <Box
          sx={{
            maxWidth: "100%",
            borderRadius: "1rem",
            backgroundColor: "transparent",
          }}
          component="img"
          alt="Agent image"
          src={
            props.agency ? props.agency.owner.avatarUrl : props.owner?.avatarUrl
          }
        ></Box>
        {props.agency && (
          <Box
            sx={{
              position: "absolute",
              bottom: 5,
              p: 2,
              zIndex: 3,
            }}
          >
            <Typography
              sx={{ color: "white" }}
              fontSize={20}
              fontWeight={900}
              variant="h5"
            >
              {`${props.agency.owner.firstName} ${props.agency.owner.lastName}`}
            </Typography>
            <Typography
              sx={{ color: "GrayText" }}
              fontSize={19}
              fontWeight={400}
              variant="body1"
            >
              Your Agent
            </Typography>
          </Box>
        )}
        {props.owner && (
          <Box position="absolute">
            <Typography fontSize={19} fontWeight={500} variant="body1">
              {`${props.owner.firstName} ${props.owner.lastName}`}
            </Typography>
            <Typography
              color="GrayText"
              fontSize={19}
              fontWeight={400}
              variant="body1"
            >
              Property Owner
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{ width: { xs: "100%", sm: "50%" } }}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <Typography fontWeight={500} variant="h5">
          Interested in this property? Request a visit.
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextFieldWithoutLabel fullWidth placeholder="Enter your name" />
          <TextFieldWithoutLabel
            fullWidth
            type="email"
            placeholder="Enter your email"
          />
          <TextFieldWithoutLabel
            fullWidth
            placeholder="Enter your phone number"
          />
          <PrimaryButton
            disableElevation
            disableRipple
            sx={{ textTransform: "none", width: "30%", borderRadius: "0.5rem" }}
            variant="contained"
            size="large"
          >
            Submit
          </PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactAgent;
