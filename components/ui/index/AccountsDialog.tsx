import {
  Dialog,
  Box,
  Typography,
  CardContent,
  CardMedia,
  CardActionArea,
  Card,
  Button,
  Input,
} from "@mui/material";
import { FC, useContext } from "react";
import { USERContext } from "../../../context/user";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AccountsDialog: FC<Props> = ({ open, onClose }) => {
  const { logoutUser } = useContext(USERContext);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Dialog open={open} PaperProps={{ sx: { minWidth: "90vw", p: 2 } }}>
      {/*Name, account id and email */}
      <Box>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap={1}
          color="#555"
        >
          <Typography variant="body1" fontSize="20px">
            <strong>Jhon Doe</strong>
          </Typography>
          <Typography variant="body1" fontSize="13px" mt="3px">
            #184263
          </Typography>
        </Box>
        <Typography variant="body1" fontSize="11px">
          somemail@domain.com
        </Typography>
      </Box>
      {/* ID Images Title */}
      <Typography
        variant="h5"
        fontSize="15px"
        fontWeight="bold"
        color="#555"
        mt={2}
      >
        ID Images
      </Typography>
      <Typography variant="body1" fontSize="11px" color="#888" ml="5px">
        The uploaded images are used to verify your identity, please consider to
        upload at least one image.
      </Typography>
      {/* ID Images Wrapper */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <ImageCard
          image="https://upload.wikimedia.org/wikipedia/commons/f/fe/C%C3%A9dula_de_Identidad_electr%C3%B3nica_de_Uruguay_-_Frente.jpg"
          title="Document overse"
          updatedAt="29/08/2022 13:06"
        />
        <ImageCard
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Dorso_de_la_C%C3%A9dula_de_Identidad_electr%C3%B3nica_de_Uruguay.jpg/220px-Dorso_de_la_C%C3%A9dula_de_Identidad_electr%C3%B3nica_de_Uruguay.jpg"
          title="Document reverse"
          updatedAt="29/08/2022 13:08"
        />
      </Box>
      {/* Actions buttons */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        mt={2}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          mb={1}
        >
          {/*Upload input*/}
          <Input type="file" />
          {/*Save button*/}
          <Button variant="text" color="primary" fullWidth onClick={onClose}>
            Save
          </Button>
        </Box>
        {/*Logout button*/}
        <Button variant="text" color="error" onClick={handleLogout} fullWidth>
          Logout
        </Button>
      </Box>
    </Dialog>
  );
};

/* Image Card */
type ImageCardProps = {
  title: string;
  updatedAt: string;
  image: string;
};

const ImageCard: FC<ImageCardProps> = ({ title, updatedAt, image }) => {
  return (
    <Card elevation={3} sx={{ my: "5px", width: "100%" }}>
      <CardActionArea>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Title and updated date */}
          <Box display="flex" flexDirection="column" color="#666">
            <Typography variant="body1" fontSize="12px" fontWeight="bold">
              {title}
            </Typography>
            <Typography variant="body1" fontSize="12px">
              {updatedAt}
            </Typography>
          </Box>
          {/* Image */}
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{ width: 90, borderRadius: "8px" }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
