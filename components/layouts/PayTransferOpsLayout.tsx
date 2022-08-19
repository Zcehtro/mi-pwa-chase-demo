import { FC } from "react";

import {
  Box,
  FormControlClasses,
  Typography,
  Unstable_Grid2 as Grid2,
} from "@mui/material";
import { CreditCardOutlined } from "@mui/icons-material";

interface Props {
  icon: any;
  label: string;
}

export const PayTransferGridItem: FC<Props> = ({ icon, label }) => {
  return (
    <Grid2
      xs={4}
      md={2}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      margin="0"
      padding="0"
    >
      <Grid2
        display="flex"
        justifyContent="center"
        textAlign="center"
        margin="0"
        padding="0"
      >
        {icon}
      </Grid2>
      <Grid2 textAlign="center" margin="0" padding="0">
        <Typography
          color="primary.main"
          display="flex"
          justifyContent="center"
          fontWeight="bold"
        >
          {label}
        </Typography>
      </Grid2>
    </Grid2>
  );
};
