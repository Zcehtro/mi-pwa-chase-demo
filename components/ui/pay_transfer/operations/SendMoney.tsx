import { FC } from "react";

import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { InactiveAccordion } from "../InactiveAccordion";
import { PayTransferOpsLayout } from "../../../layouts/PayTransferOpsLayout";
import { PayTransferButton } from "./types";

const Content: PayTransferButton = {
  label: "Send Money",
  icon: <PaidOutlinedIcon color="primary" sx={{ fontSize: 50 }} />,
  drawerContents: (
    <>
      <InactiveAccordion>Favorite 1</InactiveAccordion>
      <InactiveAccordion>Favorite 2</InactiveAccordion>
      <InactiveAccordion>Favorite 3</InactiveAccordion>
      <InactiveAccordion>Favorite 4</InactiveAccordion>
      <InactiveAccordion>New destination acccount..</InactiveAccordion>
    </>
  ),
};

export const SendMoney: FC = () => {
  return (
    <>
      <PayTransferOpsLayout {...Content} />
    </>
  );
};
