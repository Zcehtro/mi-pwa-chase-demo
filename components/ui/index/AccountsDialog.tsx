import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Avatar,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { FC, useContext } from "react";
import { USERContext } from "../../../context/user";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AccountsDialog: FC<Props> = ({ open, onClose }) => {
  const { email } = useContext(USERContext);
  return (
    <Dialog open={open}>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="John Doe" secondary={email} />
        </ListItem>
      </List>
      <Button onClick={onClose} variant="contained" color="secondary">
        logout
      </Button>
      <Button variant="contained" onClick={onClose}>
        Close
      </Button>
    </Dialog>
  );
};
