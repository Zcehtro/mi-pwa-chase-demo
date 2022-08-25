import { FC } from "react";

import { AccountBalanceOutlined } from "@mui/icons-material";
import { PayTransferOpsLayout } from "../../../layouts";

type ComponentProps = {
  label: string;
  icon: JSX.Element;
};

const Content: ComponentProps = {
  label: "Wire",
  icon: <AccountBalanceOutlined color="primary" sx={{ fontSize: 50 }} />,
};

export const Wire: FC = () => {
  return (
    <>
      <PayTransferOpsLayout {...Content}></PayTransferOpsLayout>
    </>
  );
};
