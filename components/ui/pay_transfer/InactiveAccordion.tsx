import { FC, ReactNode } from "react";
import { useRouter } from "next/router";

import { Typography, CardActionArea, CardContent, Card } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface Props {
  children: ReactNode;
  href?: string;
}

export const InactiveAccordion: FC<Props> = ({ children, href }) => {
  const router = useRouter();

  const goLink = () => {
    if (href) router.push(href);
  };

  return (
    <Card
      sx={{
        borderBottom: `1px solid lightgray`,
        "&:not(:last-child)": {
          borderBottom: 0,
        },
        "&:before": {
          display: "none",
        },
        borderRadius: 0,
      }}
      onClick={goLink}
    >
      <CardActionArea>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{children}</Typography>
          <ExpandMore sx={{ transform: "rotate(-90deg)" }} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
