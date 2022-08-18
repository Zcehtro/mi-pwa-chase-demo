import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faSackDollar,
  faFilePen,
  faStar,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

export function BottomNavigator() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Recents"
          icon={<FontAwesomeIcon icon={faWallet} size="2x" />}
        />
        <BottomNavigationAction
          label="Recents"
          icon={<FontAwesomeIcon icon={faSackDollar} size="2x" />}
        />
        <BottomNavigationAction
          label="Recents"
          icon={<FontAwesomeIcon icon={faFilePen} size="2x" />}
        />
        <BottomNavigationAction
          label="Recents"
          icon={<FontAwesomeIcon icon={faStar} size="2x" />}
        />
        <BottomNavigationAction
          label="Recents"
          icon={<FontAwesomeIcon icon={faChartLine} size="2x" />}
        />
      </BottomNavigation>
    </Box>
  );
}
