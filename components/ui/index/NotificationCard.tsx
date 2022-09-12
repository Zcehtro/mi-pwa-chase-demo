import { FC } from 'react';

import { Box, Card, CardActionArea, CardContent, Chip, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  title: string;
  description: string;
  icon: any;

  onClick?: (e: any) => void;
}

export const NotificationCard: FC<Props> = ({ title, description, icon, onClick }) => {
  return (
    <Card onClick={onClick}>
      <CardActionArea>
        <CardContent sx={{ paddingY: 3 }}>
          <Box display="flex" justifyContent="flex-start" alignItems="center" gap={1}>
            <FontAwesomeIcon icon={icon} color="#024987" size="2x" />
            <Typography
              variant="subtitle1"
              fontSize="15px"
              sx={{ color: '#555' }}
              fontWeight="bold"
            >
              {title}
            </Typography>
            <Chip label="30 sec read" sx={{ color: '#999' }} size="small" />
          </Box>
          <Typography variant="body2" fontSize="13px" color="text.secondary" pl={5}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
