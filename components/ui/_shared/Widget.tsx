import { Chip } from "@mui/material";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

interface Props {
  label: string;
  add?: boolean;

  onClick?: () => void;
}

export const Widget: FC<Props> = ({ label, add, onClick }) => {
  return (
    <Chip
      clickable
      onClick={onClick}
      label={label}
      icon={add ? <FontAwesomeIcon icon={faAdd} /> : undefined}
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
