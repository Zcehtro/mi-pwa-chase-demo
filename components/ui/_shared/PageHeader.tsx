import {
  Box,
  IconButton,
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faUser,
  faCheckCircle,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Widget } from "./";
import { userWidgets } from "../../data";

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
        {userWidgets.map((widget) => (
          <Widget key={widget._id} {...widget} />
        ))}
        <Widget add label="Add" />
      </Box>

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
    </Box>
  );
};
