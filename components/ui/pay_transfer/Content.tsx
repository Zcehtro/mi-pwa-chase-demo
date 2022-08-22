import { AccordionProps, AccordionSummaryProps, styled, Typography } from "@mui/material";

import {
  CreditCardOutlined,
  PaidOutlined,
  AccountBalanceOutlined,
  ForwardToInboxOutlined,
  CallSplitOutlined,
  NoteOutlined,
  ExpandMore,
  ArrowForwardIosSharp,
} from "@mui/icons-material";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";

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
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharp />} {...props} />
))(({ theme }) => ({
  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(0deg)",
  },
}));

export const PayTransferContent = [
  {
    icon: <CreditCardOutlined color="primary" sx={{ fontSize: 50 }} />,
    label: "Pay bills",
    drawerContents: (
      <>
        <Accordion>
          <AccordionSummary>
            <Typography>Antel</Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>UTE</Typography>
          </AccordionSummary>
        </Accordion>
      </>
    ),
  },
  {
    icon: <PaidOutlined color="primary" sx={{ fontSize: 50 }} />,
    label: "Send Money",
    drawerContents: (
      <>
        <Accordion>
          <AccordionSummary>
            <Typography>Favorite 1</Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>Favorite 2</Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>Favorite 3</Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>Favorite 4</Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>New destination acccount..</Typography>
          </AccordionSummary>
        </Accordion>
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
        <Accordion>
          <AccordionSummary>
            <Typography>Account transfers</Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>Brokerage transfers</Typography>
          </AccordionSummary>
        </Accordion>
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
