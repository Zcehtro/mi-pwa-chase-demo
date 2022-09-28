import { MainLayout } from '../components/layouts/MainLayout';
import { NextPage } from 'next';
import { Box, Button, Typography } from '@mui/material';
import { useGeolocated } from 'react-geolocated';
import { Map } from '../components/ui/_shared/Map';
import { useRouter } from 'next/dist/client/router';

const Location: NextPage = () => {
  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
  });

  const router = useRouter();

  return (
    <MainLayout>
      <Box display="flex" flexDirection="column" gap={2} p={3}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#555' }}>
          Location
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          In the future, this will be a map that displays the closest bank to you.
        </Typography>
        <Typography variant="h6" sx={{ color: '#555' }}>
          Coordinates
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          {`${coords?.latitude}, ${coords?.longitude}`}
        </Typography>
        <Box width="100%">{coords && <Map lat={coords.latitude} lon={coords.longitude} />}</Box>
      </Box>
      <Button variant="contained" color="primary" onClick={() => router.back()}>
        Back
      </Button>
    </MainLayout>
  );
};

export default Location;
