import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import React, { FC } from "react";

interface IProps {
  height?: number;
}

const PropertiesLoader: FC<IProps> = ({ height = 200 }) => {
  return (
    <Grid spacing={2} container>
      {Array.from(new Array(3)).map((_, index) => (
        <Grid xs={12} md={6} lg={4} item key={index}>
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%" }}
            height={height}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PropertiesLoader;
