import { NextPage } from "next";
import { Box, Typography } from "@mui/material";

import { MainLayout } from "../../components/layouts/MainLayout";

const Investments: NextPage = () => {
  return (
    <MainLayout>
      <Box>
        <Typography variant="h1">Investments</Typography>
      </Box>
    </MainLayout>
  );
};

export default Investments;
