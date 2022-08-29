import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { FC, useContext } from "react";
import { USERContext } from "../../../context/user";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AccountsDialog: FC<Props> = ({ open, onClose }) => {
  const { email, logoutUser } = useContext(USERContext);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Dialog open={open}>
      <Typography variant="h6">
        Hello there, <b>{email}</b>
      </Typography>
    </Dialog>
  );
};
