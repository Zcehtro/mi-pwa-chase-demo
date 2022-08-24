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
  name: string;
  number: string;
  balance: string;

  onClick?: (e: any) => void;
}

export const AccountDetailCard: FC<Props> = ({
  name,
  number,
  balance,
  onClick,
}) => {
  return (
    <Card sx={{ mt: "2px" }} onClick={onClick}>
      <CardActionArea>
        <CardContent
          sx={{ display: "flex", flexDirection: "row", px: 2, py: 3 }}
        >
          <Box width="60%">
            <Typography
              variant="caption"
              fontWeight="bold"
              color="#555"
              whiteSpace="nowrap"
            >
              {name} (...{number.slice(-4)})
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
              {balance}
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
