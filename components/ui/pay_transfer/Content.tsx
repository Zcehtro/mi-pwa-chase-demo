import { AccordionProps, AccordionSummaryProps, styled, Typography } from "@mui/material";

import {
  CreditCardOutlined,
  PaidOutlined,
  AccountBalanceOutlined,
  ForwardToInboxOutlined,
  CallSplitOutlined,
  NoteOutlined,
  ExpandMore,
} from "@mui/icons-material";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { InactiveAccordion } from "./InactiveAccordion";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ExpandMore />} {...props} />
))(({ theme }) => ({
  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(-90deg)",
  },
}));

export const PayTransferContent = [
  {
    icon: <CreditCardOutlined color="primary" sx={{ fontSize: 50 }} />,
    label: "Pay bills",
    drawerContents: (
      <>
        <InactiveAccordion>Antel</InactiveAccordion>
        <InactiveAccordion>UTE</InactiveAccordion>
      </>
    ),
  },
  {
    icon: <PaidOutlined color="primary" sx={{ fontSize: 50 }} />,
    label: "Send Money",
    drawerContents: (
      <>
        <InactiveAccordion>Favorite 1</InactiveAccordion>
        <InactiveAccordion>Favorite 2</InactiveAccordion>
        <InactiveAccordion>Favorite 3</InactiveAccordion>
        <InactiveAccordion>Favorite 4</InactiveAccordion>
        <InactiveAccordion>New destination acccount..</InactiveAccordion>
      </>
    ),
  },
  {
    icon: <AccountBalanceOutlined color="primary" sx={{ fontSize: 50 }} />,
    label: "Wire",
    drawerContents: <></>,
  },
  {
    icon: <ForwardToInboxOutlined color="primary" sx={{ fontSize: 50 }} />,
    label: "Transfer",
    drawerContents: (
      <>
        <InactiveAccordion href="/pay_transfer/transfer">Account transfers</InactiveAccordion>
        <InactiveAccordion>Brokerage transfers</InactiveAccordion>
      </>
    ),
  },
  {
    icon: <CallSplitOutlined color="primary" sx={{ fontSize: 50 }} />,
    label: "Request/Split",
    drawerContents: <></>,
  },
  {
    icon: <NoteOutlined color="primary" sx={{ fontSize: 50 }} />,
    label: "Deposit checks",
    drawerContents: <></>,
  },
];

interface AccordionInterface extends Array<AccordionTypeContents> {}

interface AccordionTypeContents {
  summary: React.ReactNode;
  details: React.ReactNode;
}

export const AccordionContent: AccordionInterface = [
  {
    summary: (
      <>
        <Typography>See activity</Typography>
      </>
    ),
    details: (
      <>
        <Typography>
          1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
          ex, sit amet blandit leo lobortis eget.
        </Typography>
      </>
    ),
  },
  {
    summary: (
      <>
        <Typography>Manage recipients</Typography>
      </>
    ),
    details: (
      <>
        <Typography>
          2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
          ex, sit amet blandit leo lobortis eget.
        </Typography>
      </>
    ),
  },
  {
    summary: (
      <>
        <Typography>Settings</Typography>
      </>
    ),
    details: (
      <>
        <Typography>
          3: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
          ex, sit amet blandit leo lobortis eget.
        </Typography>
      </>
    ),
  },
];
