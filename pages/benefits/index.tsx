import { NextPage } from "next";
import { Box, Typography } from "@mui/material";

import { MainLayout } from "../../components/layouts";

const Benefits: NextPage = () => {
  return (
    <MainLayout>
      <Box>
        <Typography variant="h1">Benefits</Typography>
      </Box>
    </MainLayout>
  );
};

export default Benefits;
