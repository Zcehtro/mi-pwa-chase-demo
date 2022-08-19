import { FC } from "react";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  title: string;
  description: string;
  icon: any;
}

export const NotificationCard: FC<Props> = ({ title, description, icon }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            gap={1}
          >
            <FontAwesomeIcon icon={icon} color="#024987" size="2x" />
            <Typography variant="subtitle1" fontWeight="bold">
              {title}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" pl={5}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
