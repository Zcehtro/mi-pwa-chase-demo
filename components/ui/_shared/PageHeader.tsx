import { Box, IconButton, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faUser } from "@fortawesome/free-solid-svg-icons";
import { Widget } from "./";

export const PageHeader = () => {
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
        <IconButton>
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
        <Widget label="See statements" />
        <Widget label="Payment history" />
        <Widget label="+" />
      </Box>
    </Box>
  );
};
