import * as React from "react";
import {Box, Paper} from "@mui/material";
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
import { AccountBalanceOutlined, AccountBalanceWalletOutlined, CurrencyExchange, HistoryEduOutlined, ShowChartOutlined, StarBorderOutlined } from "@mui/icons-material";

export function BottomNavigator() {
  const [value, setValue] = React.useState(0);

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{minHeight: "60px"}}
      >
        <BottomNavigationAction
          label="Accounts"
          icon={<AccountBalanceWalletOutlined />}
        />
        <BottomNavigationAction
          label="Pay & Transfer"
          icon={<CurrencyExchange  />}
        />
        <BottomNavigationAction
          label="Plan & Track"
          icon={<HistoryEduOutlined />}
        />
        <BottomNavigationAction
          label="Benefits"
          icon={<StarBorderOutlined /> }
        />
        <BottomNavigationAction
          label="Investments"
          icon={<ShowChartOutlined /> }
        />
      </BottomNavigation>
    </Paper>
  );
}
