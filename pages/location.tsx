import { MainLayout } from "../components/layouts/MainLayout";
import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { useGeolocated } from "react-geolocated";
import { Map } from "../components/ui/_shared/Map";

const Location: NextPage = () => {
  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
  });

  return (
    <MainLayout>
      <Box display="flex" flexDirection="column" gap={2} p={3}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#555" }}>
          Location
        </Typography>
        <Typography variant="body1" sx={{ color: "#555" }}>
          In the future, this will be a map that displays the closest bank to you.
        </Typography>
        <Typography variant="h6" sx={{ color: "#555" }}>
          Coordinates
        </Typography>
        <Typography variant="body1" sx={{ color: "#555" }}>
          {`${coords?.latitude}, ${coords?.longitude}`}
        </Typography>
        <Box width="100%" height="400px">
          {coords && <Map lat={coords.latitude} lon={coords.longitude} />}
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Location;
