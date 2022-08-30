import { FC } from "react";

import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { PayTransferOpsLayout } from "../../../layouts/PayTransferOpsLayout";
import { PayTransferButton } from "./types";

const Content: PayTransferButton = {
  label: "Wire",
  icon: <AccountBalanceOutlinedIcon color="primary" sx={{ fontSize: 50 }} />,
  drawerContents: <></>,
};

export const Wire: FC = () => {
  return (
    <>
      <PayTransferOpsLayout {...Content} />
    </>
  );
};
