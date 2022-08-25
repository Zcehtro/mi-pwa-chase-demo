import { FC } from "react";

import { CreditCardOutlined } from "@mui/icons-material";
import { InactiveAccordion } from "../InactiveAccordion";
import { PayTransferOpsLayout } from "../../../layouts/PayTransferOpsLayout";

type ComponentProps = {
  label: string;
  icon: JSX.Element;
};

const Content: ComponentProps = {
  label: "Pay bills",
  icon: <CreditCardOutlined color="primary" sx={{ fontSize: 50 }} />,
};

export const PayBills: FC = () => {
  return (
    <>
      <PayTransferOpsLayout {...Content}>
        <InactiveAccordion>Antel</InactiveAccordion>
        <InactiveAccordion>UTE</InactiveAccordion>
      </PayTransferOpsLayout>
    </>
  );
};
