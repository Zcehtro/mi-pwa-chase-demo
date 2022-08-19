import { Chip } from "@mui/material";
import { FC } from "react";

interface Props {
  label: string;
}

export const Widget: FC<Props> = ({ label }) => {
  return (
    <Chip
      clickable
      label={label}
      sx={{
        mr: 1,
        mb: 1,
        bgcolor: "#fff",
        color: "primary.main",
        fontWeight: "bold",
        minWidth: "50px",
        "&:hover": {
          backgroundColor: "#fff",
          color: "primary.main",
        },
      }}
    />
  );
};
