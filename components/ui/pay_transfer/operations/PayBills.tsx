import { FC } from "react";

import { CreditCardOutlined } from "@mui/icons-material";
import { InactiveAccordion } from "../InactiveAccordion";
import { PayTransferOpsLayout } from "../../../layouts/PayTransferOpsLayout";
import { PayTransferButton } from "./types";

const Content: PayTransferButton = {
  label: "Pay bills",
  icon: <CreditCardOutlined color="primary" sx={{ fontSize: 50 }} />,
  drawerContents: (
    <>
      <InactiveAccordion>Antel</InactiveAccordion>
      <InactiveAccordion>UTE</InactiveAccordion>
    </>
  ),
};

export const PayBills: FC = () => {
  return (
    <>
      <PayTransferOpsLayout {...Content} />
    </>
  );
};
