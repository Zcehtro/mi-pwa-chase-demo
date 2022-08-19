import { FC } from "react";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";

interface Props {
  accountName: string;
  accountNumber: string;
  accountBalance: string;
}

export const AccountDetailCard: FC<Props> = ({
  accountName,
  accountNumber,
  accountBalance,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      pl={2}
      py={1}
      minHeight="110px"
      bgcolor="#fff"
      borderBottom="2px solid #ACD1DE"
    >
      <Box width="60%">
        <Typography variant="caption" fontWeight="bold" color="#555">
          {accountName} (...{accountNumber.slice(-4)})
        </Typography>
      </Box>
      <Box
        width="35%"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Typography variant="h5" fontWeight="lighter" color="#555">
          {accountBalance}
        </Typography>
        <Typography variant="body2" fontSize="12px" color="#777">
          Available balance
        </Typography>
      </Box>
      <Box
        width="5%"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        mr="3px"
      >
        <FontAwesomeIcon icon={faGripLinesVertical} color="#777" />
      </Box>
    </Box>
  );
};
