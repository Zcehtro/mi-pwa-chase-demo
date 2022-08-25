import { FC } from "react";

import { NoteOutlined } from "@mui/icons-material";
import { PayTransferOpsLayout } from "../../../layouts";

type ComponentProps = {
  label: string;
  icon: JSX.Element;
};

const Content: ComponentProps = {
  label: "Deposit checks",
  icon: <NoteOutlined color="primary" sx={{ fontSize: 50 }} />,
};

export const DepositChecks: FC = () => {
  return (
    <>
      <PayTransferOpsLayout {...Content}></PayTransferOpsLayout>
    </>
  );
};
