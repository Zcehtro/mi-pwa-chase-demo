import { Box } from "@mui/material";
import { FC } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const topoJson = "https://raw.githubusercontent.com/alotropico/uruguay.geo/master/uruguay.json";

interface MapProps {
  lat: number;
  lon: number;
  altitude?: number;
}

export const Map: FC<MapProps> = ({ lat, lon, altitude }) => {
  const marker = {
    markerOffset: -30,
    name: "Current Location",
    coordinates: [lon, lat],
  };

  return (
    <Box>
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [58, 20, 0],
          scale: 7000,
          center: [2, -12.5],
        }}
      >
        <Geographies geography={topoJson}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC" stroke="#D6D6DA" />
            ))
          }
        </Geographies>
        <Marker coordinates={[lon, lat]}>
          <g
            fill="none"
            stroke="#FF5533"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          <text
            textAnchor="middle"
            y={marker.markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {marker.name}
          </text>
        </Marker>
      </ComposableMap>
    </Box>
  );
};
