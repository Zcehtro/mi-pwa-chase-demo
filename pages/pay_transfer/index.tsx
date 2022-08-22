import { AccordionContent, PayTransferContent } from "../../components/ui/pay_transfer/Content";

import { useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";

import { Unstable_Grid2 as Grid2, AccordionDetails, Typography, Box, AppBar } from "@mui/material";
import { BottomNavigator, PayTransferGridItem as GridItem } from "../../components/ui";
import { ExpandMore, ArrowForwardIosSharp } from "@mui/icons-material";

import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import { MainLayout } from "../../components/layouts";

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
      <Box>
        <AppBar>
          <Typography color="white" variant="h6" textAlign="center">
            Pay & Transfer
          </Typography>
        </AppBar>
      </Box>

      <Box style={{ backgroundColor: "#f3f7f8", height: "100vh" }}>
        <Grid2 style={{ margin: "0 15px", padding: "0 0 40px" }} container spacing={4}>
          {PayTransferContent.map(({ icon, label, drawerContents }, index) => (
            <GridItem icon={icon} label={label} drawerContents={drawerContents} key={index} />
          ))}
        </Grid2>
        <Box style={{ margin: "40px 25px" }}>
          {AccordionContent.map((element, index) => (
            <Accordion
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
              key={index}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
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
      <BottomNavigator />
    </MainLayout>
  );
};

export default PayTransfer;
