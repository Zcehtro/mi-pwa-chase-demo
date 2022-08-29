import { NextPage } from "next";
import { Box, Typography } from "@mui/material";

import { MainLayout } from "../../components/layouts/MainLayout";

const PlanTrack: NextPage = () => {
  return (
    <MainLayout>
      <Box>
        <Typography variant="h1">Plan and Track</Typography>
      </Box>
    </MainLayout>
  );
};

export default PlanTrack;
