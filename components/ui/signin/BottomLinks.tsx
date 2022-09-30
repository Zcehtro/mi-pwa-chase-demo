import { FC } from 'react';

import Link from 'next/link';

import { Box, Typography, Divider } from '@mui/material';

export const BottomLinks: FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={2} flexWrap="wrap">
      <Link href="/about">
        <Typography color="primary.main" fontWeight="bold" style={{ cursor: 'pointer' }}>
          About
        </Typography>
      </Link>
      <Divider orientation="vertical" flexItem />
      <Link href="/privacy">
        <Typography color="primary.main" fontWeight="bold" style={{ cursor: 'pointer' }}>
          Privacy
        </Typography>
      </Link>
    </Box>
  );
};
