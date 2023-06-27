import React, { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { SxProps, useTheme } from "@mui/material/styles";
import { IProperty } from "@/types/property";
import dayjs from "dayjs";

const ListingPriceCardBox: FC<IProperty & { sx?: SxProps }> = (props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "fit-content",
        borderRadius: "5px",
        backgroundColor: "white",
        p: 1,
        border: `4px solid ${theme.palette.primary.main}`,
        overflowWrap: "anywhere",
        ...props.sx,
      }}
    >
      <Typography fontWeight={500} variant="h4" py={2}>
        ₦{props.price.toLocaleString("en")}
      </Typography>
      <Divider />
      {props.agency && (
        <Box py={2}>
          <Typography fontSize={19} fontWeight={500} variant="body1">
            {props.agency.agencyName}
          </Typography>
          <Typography
            color="GrayText"
            fontSize={19}
            fontWeight={500}
            variant="body1"
          >
            Agent
          </Typography>
        </Box>
      )}
      {props.owner && (
        <Box py={2}>
          <Typography>{`${props.owner.firstName} ${props.owner.lastName}`}</Typography>
          <Typography>Owner</Typography>
        </Box>
      )}
      <Divider />
      <Box py={2}>
        <Typography
          color="GrayText"
          fontSize={19}
          fontWeight={500}
          variant="body1"
        >
          Posted on
        </Typography>
        <Typography fontSize={19} fontWeight={500} variant="body1">
          {dayjs(props.publishedDate).format("MMMM DD, YYYY")}
        </Typography>
      </Box>
    </Box>
  );
};

export default ListingPriceCardBox;
