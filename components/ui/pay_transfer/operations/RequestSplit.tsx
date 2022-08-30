import { FC } from "react";

import CallSplitOutlinedIcon from "@mui/icons-material/CallSplitOutlined";
import { PayTransferOpsLayout } from "../../../layouts/PayTransferOpsLayout";
import { PayTransferButton } from "./types";

const Content: PayTransferButton = {
  label: "Request/Split",
  icon: <CallSplitOutlinedIcon color="primary" sx={{ fontSize: 50 }} />,
  drawerContents: <></>,
};

export const RequestSplit: FC = () => {
  return (
    <>
      <PayTransferOpsLayout {...Content} />
    </>
  );
};
