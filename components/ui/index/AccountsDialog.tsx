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
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        sx={{ padding: 2, mt: 3 }}
        gap={1}
      >
        <Button onClick={handleLogout} variant="text" sx={{ color: "red" }}>
          logout
        </Button>
        <Button variant="text" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Dialog>
  );
};
