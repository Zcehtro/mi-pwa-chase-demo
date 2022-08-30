import { FC } from "react";

import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import { PayTransferOpsLayout } from "../../../layouts/PayTransferOpsLayout";
import { PayTransferButton } from "./types";

const Content: PayTransferButton = {
  label: "Deposit checks",
  icon: <NoteOutlinedIcon color="primary" sx={{ fontSize: 50 }} />,
  drawerContents: <></>,
};

export const DepositChecks: FC = () => {
  return (
    <>
      <PayTransferOpsLayout {...Content} />
    </>
  );
};
