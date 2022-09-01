import { ChangeEvent, FC, forwardRef, ReactElement, Ref, useState, MouseEvent } from "react";

import {
  List,
  Divider,
  Avatar,
  Box,
  Drawer,
  Grid,
  Typography,
  AppBar,
  Button,
  Dialog,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slide,
  Switch,
  TextField,
  Toolbar,
} from "@mui/material";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import { motion } from "framer-motion";

import { PayTransferButton } from "../types";
import { TransitionProps } from "@mui/material/transitions";
import { SecondaryLayout } from "../../../../layouts/SecondaryLayout";

// Interfaces -------------------------------------------------------------------------------------
interface StateTransferAmount {
  amount: string;
}

interface StateUIDialog {
  AccountTransfers: boolean;
  BrokerageTransfers: boolean;
}

type DialogHandles = "AccountTransfers" | "BrokerageTransfers";
// ------------------------------------------------------------------------------------------------

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const Transfer: FC = () => {
  const Content: PayTransferButton = {
    label: "Transfer",
    icon: <ForwardToInboxOutlinedIcon color="primary" sx={{ fontSize: 50 }} />,
  };

  const [anchorDirection, setAnchorDirection] = useState({ bottom: false });
  const [openDialogs, setOpenDialogs] = useState<StateUIDialog>({
    AccountTransfers: false,
    BrokerageTransfers: false,
  });
  const [transferAmount, setTransferAmount] = useState<StateTransferAmount>({ amount: "0" });
  const [sourceAccount, setSourceAccount] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [checkedSwitch, setCheckedSwitch] = useState(true);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setAnchorDirection({ bottom: open });
  };

  const handleChangeTransferFrom = (event: SelectChangeEvent) => {
    setSourceAccount(event.target.value);
  };

  const handleChangeTransferTo = (event: SelectChangeEvent) => {
    setDestinationAccount(event.target.value);
  };

  const handleChangeTransferOn = (event: SelectChangeEvent) => {
    setTransferDate(event.target.value);
  };

  const handleClickOpenDialog = (dialog: DialogHandles) => {
    setOpenDialogs({
      AccountTransfers: dialog === "AccountTransfers",
      BrokerageTransfers: dialog === "BrokerageTransfers",
    });
    setAnchorDirection({ bottom: false });
  };

  const handleCloseDialog = () => {
    setOpenDialogs({
      AccountTransfers: false,
      BrokerageTransfers: false,
    });
  };

  const handleChangeAmount =
    (prop: keyof StateTransferAmount) => (event: ChangeEvent<HTMLInputElement>) => {
      setTransferAmount({ ...transferAmount, [prop]: event.target.value });
    };

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedSwitch(event.target.checked);
  };

  return (
    <>
      <Grid item xs={4} md={2}>
        <Box
          display="flex"
          justifyContent="center"
          textAlign="center"
          margin="1rem"
          padding="30px 0 0"
        >
          <motion.button
            className="paytransfer-btn-motion"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Avatar
              alt={Content.label}
              sx={{ backgroundColor: "white", width: 80, height: 80 }}
              onClick={toggleDrawer(true)}
            >
              {Content.icon}
            </Avatar>
          </motion.button>
        </Box>
        <Box textAlign="center" margin="0" padding="0">
          <Typography color="primary.main" display="flex" justifyContent="center" fontWeight="bold">
            {Content.label}
          </Typography>
        </Box>
      </Grid>

      <Drawer anchor={"bottom"} open={anchorDirection["bottom"]} onClose={toggleDrawer(false)}>
        <Typography variant="h5" align="center" sx={{ margin: "1rem 0 0.6rem" }}>
          {Content.label}
        </Typography>
        <List>
          <ListItem button onClick={() => handleClickOpenDialog("AccountTransfers")}>
            <ListItemText
              primary="Account Transfers"
              secondary="Transfer money to an account of your choosing"
            />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleClickOpenDialog("BrokerageTransfers")}>
            <ListItemText
              primary="Brokerage Transfers"
              secondary="Transfer money to a broker account"
            />
          </ListItem>
        </List>
      </Drawer>

      <Dialog
        fullScreen
        open={openDialogs["AccountTransfers"]}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        transitionDuration={700}
      >
        <SecondaryLayout>
          <Box>
            <AppBar>
              <Toolbar>
                <IconButton edge="start" sx={{ mr: 8 }} />
                <Typography
                  color="white"
                  variant="h6"
                  fontSize="18"
                  textAlign="center"
                  sx={{ flexGrow: 1 }}
                >
                  Schedule a Transfer
                </Typography>
                <Button color="inherit" onClick={handleCloseDialog}>
                  Cancel
                </Button>
              </Toolbar>
            </AppBar>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: "100px", flexWrap: "wrap" }}>
            <FormControl
              fullWidth
              sx={{ m: 1, width: "50vw", minWidth: "380px" }}
              variant="standard"
            >
              <Typography
                color="rgb(0,0,0,0.6)"
                sx={{
                  fontSize: "0.8rem",
                  textAlign: "center",
                  margin: "0 0 10px",
                }}
              >
                Amount
              </Typography>
              <Input
                id="standard-adornment-amount"
                type="number"
                value={transferAmount.amount}
                onChange={handleChangeAmount("amount")}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                sx={{ fontSize: "2rem" }}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              mt: "40px",
              flexGrow: 1,
            }}
          >
            <Grid container>
              <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
                <FormControl
                  variant="standard"
                  sx={{
                    m: 1,
                    width: "40vw",
                    minWidth: "380px",
                    maxWidth: "450px",
                  }}
                >
                  <Typography
                    color="rgb(0,0,0,0.6)"
                    sx={{
                      fontSize: "0.8rem",
                      textAlign: "start",
                      margin: "0 0 10px",
                    }}
                  >
                    Transfer from
                  </Typography>
                  <Select
                    labelId="select-source-account-label"
                    id="select-source-account"
                    value={sourceAccount}
                    onChange={handleChangeTransferFrom}
                    label="source-account"
                  >
                    <MenuItem value="">
                      <em>Select an account...</em>
                    </MenuItem>
                    <MenuItem value={1}>My Checking Account (...2599) $88.00</MenuItem>
                    <MenuItem value={2}>My Savings Account (...3411) $5,243.00</MenuItem>
                    <MenuItem value={3}>My Salary Account (...5633) $43,148.00</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
                <FormControl
                  variant="standard"
                  sx={{
                    m: 1,
                    width: "40vw",
                    minWidth: "380px",
                    maxWidth: "450px",
                  }}
                >
                  <Typography
                    color="rgb(0,0,0,0.6)"
                    sx={{
                      fontSize: "0.8rem",
                      textAlign: "start",
                      margin: "0 0 10px",
                    }}
                  >
                    Transfer to
                  </Typography>
                  <Select
                    labelId="select-destination-account-label"
                    id="select-destination-account"
                    value={destinationAccount}
                    onChange={handleChangeTransferTo}
                    label="destination-account"
                  >
                    <MenuItem value="">
                      <em>Select an account...</em>
                    </MenuItem>
                    <MenuItem value={1}>My Checking Account (...2599) $88.00</MenuItem>
                    <MenuItem value={2}>My Savings Account (...3411) $5,243.00</MenuItem>
                    <MenuItem value={3}>My Salary Account (...5633) $43,148.00</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ m: "40px ", display: "flex", justifyContent: "center" }}>
            <Grid container justifyContent="end" alignItems="baseline">
              <Grid item>
                <Typography>Repeat transfer</Typography>
              </Grid>
              <Grid item>
                <Switch
                  checked={checkedSwitch}
                  onChange={handleChangeSwitch}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Typography
                color="rgb(0,0,0,0.6)"
                sx={{
                  fontSize: "0.8rem",
                  textAlign: "center",
                  margin: "0 0 10px",
                }}
              >
                Transfer on
              </Typography>
              <Select
                labelId="select-transfer-date-label"
                id="select-transfer-date"
                value={transferDate}
                onChange={handleChangeTransferOn}
                label="transfer-date"
              >
                <MenuItem value="">
                  <em>Select an account...</em>
                </MenuItem>
                <MenuItem value={1}>Today</MenuItem>
                <MenuItem value={2}>Tomorrow</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Typography
                color="rgb(0,0,0,0.6)"
                sx={{
                  fontSize: "0.8rem",
                  textAlign: "center",
                  margin: "0 0 10px",
                }}
              >
                Memo
              </Typography>
              <TextField
                id="memo"
                type="search"
                variant="standard"
                placeholder="What's it for? (optional)"
                helperText="32 of 32 characters remaining"
              />
            </FormControl>
          </Box>
          <Box>
            <Button>Transfer</Button>
          </Box>
        </SecondaryLayout>
      </Dialog>

      <Dialog
        fullScreen
        open={openDialogs["BrokerageTransfers"]}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        transitionDuration={700}
      >
        <SecondaryLayout>
          <Box>
            <AppBar>
              <Toolbar>
                <IconButton edge="start" sx={{ mr: 8 }} />
                <Typography
                  color="white"
                  variant="h6"
                  fontSize="18"
                  textAlign="center"
                  sx={{ flexGrow: 1 }}
                >
                  Brokerage Transfers
                </Typography>
                <Button color="inherit" onClick={handleCloseDialog}>
                  Cancel
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
          <Box sx={{ mt: "100px" }}>
            <Typography>
              Testing different dialogs in same component. React state magic!!✨
            </Typography>
          </Box>
        </SecondaryLayout>
      </Dialog>
    </>
  );
};
