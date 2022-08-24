import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Widget } from "./";
import { userWidgets, availableWidgets } from "../../data";
import { AccountsDialog } from "./";
import {
  Box,
  IconButton,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Drawer,
} from "@mui/material";
import {
  faComments,
  faUser,
  faCheckCircle,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export const PageHeader = () => {
  const [widgetList, setWidgetList] = useState(availableWidgets);
  const [userWidgetList, setUserWidgetList] = useState(userWidgets);
  const [showWidgetList, setShowWidgetList] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);

  const handleAddWidget = () => {};

  const showAccountsDialog = () => {
    setShowAccounts(true);
  };

  return (
    <Box
      width="100%"
      height="250px"
      bgcolor="primary.main"
      color="primary.contrastText"
      display="flex"
      flexDirection="column"
      p={2}
    >
      {/*Top Icons */}
      <Box
        width="100%"
        maxWidth="600px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton>
          <FontAwesomeIcon icon={faComments} color="#fff" />
        </IconButton>
        <IconButton onClick={showAccountsDialog}>
          <FontAwesomeIcon icon={faUser} color="#fff" />
        </IconButton>
      </Box>
      {/* Welcome Text */}
      <Box width="100%" maxWidth="600px" mt={2}>
        <Typography variant="body1" fontSize="13px" fontWeight="thin">
          Good morning | August 18, 2022
        </Typography>
      </Box>
      {/* Widgets Container */}
      <Box
        width="100%"
        maxWidth="600px"
        mt={2}
        display="flex"
        justifyContent="flex-start"
        flexWrap="wrap"
      >
        {userWidgets.map(widget => (
          <Widget key={widget._id} {...widget} />
        ))}
        <Widget
          add
          label="Add"
          onClick={handleAddWidget}
          zIndex={showWidgetList ? 1000 : 1}
        />
      </Box>
      {/* Add Widget Drawer */}
      <Drawer
        anchor="bottom"
        open={showWidgetList}
        onClose={() => setShowWidgetList(false)}
      >
        <Box
          width="100%"
          maxWidth="600px"
          display="flex"
          flexDirection="column"
          py={3}
          pl={2}
          bgcolor="primary.main"
        >
          {/* Equipped Widgets on edit */}
          <Typography
            variant="h6"
            fontSize="16px"
            fontWeight="bold"
            color="primary.contrastText"
          >
            {" "}
            Your widgets{" "}
          </Typography>
          <Box
            width="100%"
            maxWidth="600px"
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-start"
            mb={5}
          >
            {userWidgets.map(widget => (
              <Widget key={widget._id} {...widget} size="small" />
            ))}
          </Box>
          <Typography
            variant="h6"
            fontSize="16px"
            fontWeight="bold"
            color="primary.contrastText"
          >
            {" "}
            Available widgets{" "}
          </Typography>
          <Box
            width="100%"
            maxWidth="600px"
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
          >
            {availableWidgets.map(widget => (
              <Widget key={widget._id} {...widget} add />
            ))}
          </Box>
        </Box>
      </Drawer>

      {/* Last movement card */}

      <Card sx={{ my: "2px", backgroundColor: "rgba(255,255,255,0.2)" }}>
        <CardActionArea>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* Movement card icon */}
            <FontAwesomeIcon icon={faCheckCircle} color="#77DD77" size="2x" />
            <Box sx={{ whiteSpace: "nowrap" }}>
              <Typography variant="body1" fontSize="12px" color="#eaeaea">
                Successfully sent <b>$1.000,00</b> to <b>John Doe</b>
              </Typography>
              <Typography
                variant="body2"
                fontSize="11px"
                color="rgba(255,255,255,0.4)"
              >
                See details
              </Typography>
            </Box>
            <FontAwesomeIcon
              icon={faChevronRight}
              color="rgba(255,255,255, 0.5)"
              size="1x"
            />
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Accounts Dialog */}
      <AccountsDialog
        open={showAccounts}
        onClose={() => setShowAccounts(false)}
      />
    </Box>
  );
};
