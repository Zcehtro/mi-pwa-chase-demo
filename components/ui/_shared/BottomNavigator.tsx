import * as React from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { useRouter } from "next/router";

export function BottomNavigator() {
  const [value, setValue] = React.useState(0);

  const router = useRouter();

  const goLink = (href: string) => {
    router.push(href);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, minHeight: "60px" }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Accounts"
          icon={<AccountBalanceWalletOutlinedIcon />}
          sx={{ padding: "0 2px" }}
          onClick={() => goLink("/")}
        />
        <BottomNavigationAction
          label="Pay & Transfer"
          icon={<CurrencyExchangeIcon />}
          sx={{ padding: "0 2px" }}
          onClick={() => goLink("/pay_transfer")}
        />
        <BottomNavigationAction
          label="Plan & Track"
          icon={<HistoryEduOutlinedIcon />}
          sx={{ padding: "0 2px" }}
          onClick={() => goLink("/plan_track")}
        />
        <BottomNavigationAction
          label="Benefits"
          icon={<StarBorderOutlinedIcon />}
          sx={{ padding: "0 2px" }}
          onClick={() => goLink("/benefits")}
        />
        <BottomNavigationAction
          label="Investments"
          icon={<ShowChartOutlinedIcon />}
          sx={{ padding: "0 2px" }}
          onClick={() => goLink("/investments")}
        />
      </BottomNavigation>
    </Paper>
  );
}
