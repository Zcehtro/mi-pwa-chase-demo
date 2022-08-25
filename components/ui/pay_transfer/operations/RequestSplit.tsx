import { FC } from "react";

import { CallSplitOutlined } from "@mui/icons-material";
import { PayTransferOpsLayout } from "../../../layouts";

type ComponentProps = {
  label: string;
  icon: JSX.Element;
};

const Content: ComponentProps = {
  label: "Request/Split",
  icon: <CallSplitOutlined color="primary" sx={{ fontSize: 50 }} />,
};

export const RequestSplit: FC = () => {
  return (
    <>
      <PayTransferOpsLayout {...Content}></PayTransferOpsLayout>
    </>
  );
};
