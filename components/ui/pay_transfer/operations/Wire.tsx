import { FC } from "react";

import { AccountBalanceOutlined } from "@mui/icons-material";
import { PayTransferOpsLayout } from "../../../layouts";
import { PayTransferButton } from "./types";

const Content: PayTransferButton = {
  label: "Wire",
  icon: <AccountBalanceOutlined color="primary" sx={{ fontSize: 50 }} />,
  drawerContents: <></>,
};

export const Wire: FC = () => {
  return (
    <>
      <PayTransferOpsLayout {...Content} />
    </>
  );
};
