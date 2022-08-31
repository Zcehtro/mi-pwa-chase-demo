import { FC, PropsWithChildren, ReactNode, useState } from "react";

import { Avatar, Drawer, Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";

interface Props {
  label: string;
  icon: JSX.Element;
  drawerContents?: ReactNode;
  open?: boolean;
}

export const PayTransferOpsLayout: FC<PropsWithChildren<Props>> = ({
  label,
  icon,
  drawerContents,
  open = false,
}) => {
  const [anchorDirection, setAnchorDirection] = useState({ bottom: open });

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
              alt={label}
              sx={{ backgroundColor: "white", width: 80, height: 80 }}
              onClick={toggleDrawer(true)}
            >
              {icon}
            </Avatar>
          </motion.button>
        </Box>
        <Box textAlign="center" margin="0" padding="0">
          <Typography color="primary.main" display="flex" justifyContent="center" fontWeight="bold">
            {label}
          </Typography>
        </Box>
      </Grid>

      <Drawer anchor={"bottom"} open={anchorDirection["bottom"]} onClose={toggleDrawer(false)}>
        <Typography variant="h5" align="center" sx={{ margin: "1rem 0 0.6rem" }}>
          {label}
        </Typography>
        {drawerContents}
      </Drawer>
    </>
  );
};
