import { FC } from "react";

import { NoteOutlined } from "@mui/icons-material";
import { PayTransferOpsLayout } from "../../../layouts";
import { PayTransferButton } from "./types";

const Content: PayTransferButton = {
  label: "Deposit checks",
  icon: <NoteOutlined color="primary" sx={{ fontSize: 50 }} />,
  drawerContents: <></>,
};

export const DepositChecks: FC = () => {
  return (
    <>
      <PayTransferOpsLayout {...Content} />
    </>
  );
};
