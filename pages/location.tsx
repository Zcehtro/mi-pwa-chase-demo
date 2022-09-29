import { MainLayout } from '../components/layouts/MainLayout';
import { NextPage } from 'next';
import Link from 'next/link';
import { Box, Button, Chip, Typography } from '@mui/material';
import { useGeolocated } from 'react-geolocated';
import { Map } from '../components/ui/_shared/Map';
import { useRouter } from 'next/dist/client/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageHeader } from '../components/ui/_shared/PageHeader';

const Location: NextPage = () => {
  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
  });

  const router = useRouter();

  return (
    <MainLayout>
      <PageHeader />
      <Box display="flex" flexDirection="column" gap={2} p={3}>
        {/* back to home */}
        <Box display="flex" justifyContent="flex-start" maxWidth="30vw">
          <Link href="/" passHref>
            <Chip color="info" label="Home" icon={<FontAwesomeIcon icon={faChevronLeft} />} />
          </Link>
        </Box>
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#444' }}>
            Geolocation
          </Typography>
          <Typography variant="body1" fontSize="12px" sx={{ color: '#555' }}>
            This page will show you your current location.
          </Typography>
        </Box>
        <Box width="100%">{coords && <Map lat={coords.latitude} lon={coords.longitude} />}</Box>
      </Box>
      <Box display="flex" flexDirection="column" gap={2} p={3}>
        <Typography variant="h6" fontSize="14px" sx={{ color: '#555' }}>
          Coordinates
        </Typography>
        {coords && (
          <Box display="flex" flexDirection="column" gap={1}>
            <Chip color="primary" label={`Latitude: ${coords.latitude}`} />
            <Chip color="primary" label={`Longitude: ${coords.longitude}`} />
            <Chip color="primary" label={`Accuracy: ${coords.accuracy}`} />
          </Box>
        )}
      </Box>
    </MainLayout>
  );
};

export default Location;
