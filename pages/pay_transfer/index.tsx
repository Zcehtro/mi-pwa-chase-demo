import { useState } from "react";

import type { NextPage } from "next";

import { AccordionContent } from "../../components/ui/pay_transfer/Content";

import { Box, styled, AppBar, Typography, Grid, AccordionDetails, Toolbar } from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import { MainLayout } from "../../components/layouts/MainLayout";

import {
  DepositChecks,
  PayBills,
  RequestSplit,
  SendMoney,
  Transfer,
  Wire,
} from "../../components/ui/pay_transfer/operations";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} {...props} />
))(({ theme }) => ({
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(0deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(-90deg)",
  },
}));

const PayTransfer: NextPage = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <MainLayout>
      <AppBar>
        <Toolbar>
          <Typography color="white" variant="h6" textAlign="center" sx={{ flexGrow: 1 }}>
            Pay & Transfer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        style={{
          backgroundColor: "#f3f7f8",
          height: "100vh",
          width: "100vw",
          position: "absolute",
        }}
      ></Box>
      <Box
        style={{
          padding: "60px 0 0",
        }}
      >
        <Grid container spacing={4}>
          <PayBills />
          <SendMoney />
          <Wire />
          <Transfer />
          <RequestSplit />
          <DepositChecks />
        </Grid>
        <Box style={{ margin: "40px 25px" }}>
          {AccordionContent.map((element, index) => (
            <Accordion
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
              key={index}
            >
              <AccordionSummary
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                {element.summary}
              </AccordionSummary>
              <AccordionDetails>{element.details}</AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </MainLayout>
  );
};

export default PayTransfer;
