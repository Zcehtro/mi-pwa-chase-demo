import { FC } from "react";

import { CallSplitOutlined } from "@mui/icons-material";
import { PayTransferOpsLayout } from "../../../layouts";
import { PayTransferButton } from "./types";

const Content: PayTransferButton = {
  label: "Request/Split",
  icon: <CallSplitOutlined color="primary" sx={{ fontSize: 50 }} />,
  drawerContents: <></>,
};

export const RequestSplit: FC = () => {
  return (
    <>
      <PayTransferOpsLayout {...Content} />
    </>
  );
};
