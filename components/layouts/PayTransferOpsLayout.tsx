import { FC, PropsWithChildren, ReactNode, useState } from "react";

import { Avatar, Drawer, Typography, Grid, Box } from "@mui/material";

interface Props {
  label: string;
  icon: JSX.Element;
  children?: ReactNode;
}

type Anchor = "bottom";

export const PayTransferOpsLayout: FC<PropsWithChildren<Props>> = ({ label, icon, children }) => {
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
      <Grid item xs={4} md={2}>
        <Box
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
        </Box>
        <Box textAlign="center" margin="0" padding="0">
          <Typography color="primary.main" display="flex" justifyContent="center" fontWeight="bold">
            {label}
          </Typography>
        </Box>
      </Grid>

      <Drawer
        anchor={"bottom"}
        open={anchorDirection["bottom"]}
        onClose={toggleDrawer("bottom", false)}
      >
        <Typography variant="h5" align="center" sx={{ margin: "1rem 0 0.6rem" }}>
          {label}
        </Typography>
        {children}
      </Drawer>
    </>
  );
};
