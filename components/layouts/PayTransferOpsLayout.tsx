import { FC, useState } from "react";

import {
  Avatar,
  Box,
  Drawer,
  Typography,
  Unstable_Grid2 as Grid2,
} from "@mui/material";

interface Props {
  icon: any;
  label: string;
  drawerContents: any;
}

type Anchor = "bottom";

export const PayTransferGridItem: FC<Props> = ({ icon, label, drawerContents }) => {
  const [anchorDirection, setAnchorDirection] = useState({ bottom: false });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setAnchorDirection({ ...anchorDirection, [anchor]: open });
    };

  return (
    <>
      <Grid2
        xs={4}
        md={2}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        margin="0"
        padding="0"
      >
        <Grid2
          display="flex"
          justifyContent="center"
          textAlign="center"
          margin="1rem"
          padding="30px 0 0"
        >
          <Avatar
            alt={label}
            sx={{ backgroundColor: "white", width: 80, height: 80 }}
            onClick={toggleDrawer("bottom", true)}
          >
            {icon}
          </Avatar>
        </Grid2>
        <Grid2 textAlign="center" margin="0" padding="0">
          <Typography color="primary.main" display="flex" justifyContent="center" fontWeight="bold">
            {label}
          </Typography>
        </Grid2>
      </Grid2>

      <Drawer
        anchor={"bottom"}
        open={anchorDirection["bottom"]}
        onClose={toggleDrawer("bottom", false)}
      >
        <Typography variant="h5" align="center" sx={{margin: "1rem 0 0.6rem" }}>{label}</Typography>
        {drawerContents}
      </Drawer>
    </>
  );
};
