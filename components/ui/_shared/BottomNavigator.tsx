import * as React from "react";
import { Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {
  AccountBalanceWalletOutlined,
  CurrencyExchange,
  HistoryEduOutlined,
  ShowChartOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";

export function BottomNavigator() {
  const [value, setValue] = React.useState(0);

  const router = useRouter();

  const goLink = (href: string) => {
    router.push(href);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ minHeight: "60px" }}
      >
        <BottomNavigationAction
          label="Accounts"
          icon={<AccountBalanceWalletOutlined />}
          sx={{ padding: "0 2px" }}
          onClick={() => goLink("/")}
        />
        <BottomNavigationAction
          label="Pay & Transfer"
          icon={<CurrencyExchange />}
          sx={{ padding: "0 2px" }}
          onClick={() => goLink("/pay_transfer")}
          />
        <BottomNavigationAction
          label="Plan & Track"
          icon={<HistoryEduOutlined />}
          sx={{ padding: "0 2px" }}
          onClick={() => goLink("/plan_track")}
          />
        <BottomNavigationAction
          label="Benefits"
          icon={<StarBorderOutlined />}
          sx={{ padding: "0 2px" }}
          onClick={() => goLink("/benefits")}
          />
        <BottomNavigationAction
          label="Investments"
          icon={<ShowChartOutlined />}
          sx={{ padding: "0 2px" }}
          onClick={() => goLink("/investments")}
        />
      </BottomNavigation>
    </Paper>
  );
}
