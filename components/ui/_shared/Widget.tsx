import { Chip } from "@mui/material";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

interface Props {
  label: string;
  zIndex?: number;
  size?: "small" | "medium" | undefined;
  add?: boolean;

  onClick?: () => void;
}

export const Widget: FC<Props> = ({ label, add, onClick, zIndex, size }) => {
  return (
    <Chip
      clickable
      onClick={onClick}
      label={label}
      size={size ? size : "medium"}
      icon={add ? <FontAwesomeIcon icon={faAdd} /> : undefined}
      sx={{
        zIndex: zIndex || 1,
        mr: 1,
        mb: 1,
        bgcolor: size === "small" ? "rgba(255,255,255,0.5)" : "#fff",
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
