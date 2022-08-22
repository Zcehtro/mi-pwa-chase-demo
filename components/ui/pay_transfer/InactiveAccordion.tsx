import { FC, ReactNode } from "react";

import { styled, AccordionProps, AccordionSummaryProps, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";

interface Props {
  children: ReactNode;
}

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

export const InactiveAccordion: FC<Props> = ({ children }) => {
  return (
    <Accordion square={true}>
      <AccordionSummary>
        <Typography>{children}</Typography>
      </AccordionSummary>
    </Accordion>
  );
};
