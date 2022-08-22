import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import {
  AccountDetailCard,
  BottomNavigator,
  NotificationCard,
  PageHeader,
  Widget,
} from "../components/ui";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faGripLinesVertical,
} from "@fortawesome/free-solid-svg-icons";
import { MainLayout } from "../components/layouts";
import { bankAccounts } from "../data";

const Home: NextPage = () => {
  return (
    <MainLayout>
      {/* Page Header */}
      <PageHeader />
      {/* Page Content */}
      <Box
        width="100%"
        maxWidth="600px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={2}
      >
        {/* Today's Snapshot Card */}
        <NotificationCard
          title="Today's Snapshot"
          description="Woo-hoo! You earned 655 points on a recent purchase."
          icon={faTrophy}
        />

        {/* Main Content */}
        <Box width="100%" display="flex" flexDirection="column" gap={2} p={3}>
          {/* Title */}
          <Typography variant="h5" fontWeight="bold">
            Accounts
          </Typography>

          {/* Overview */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            sx={{
              minHeight: "calc(100vh - 300px)",
              bgcolor: "#F3FAFF",
              borderRadius: 2,
              border: "2px solid #ACD1DE",
            }}
          >
            {/* Overview title */}
            <Box p={2}>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                Overview
              </Typography>
            </Box>

            {/* Bank Account Card */}
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              bgcolor="primary.main"
              sx={{ borderTopRightRadius: 5, borderTopLeftRadius: 5 }}
            >
              <Typography variant="subtitle1" fontWeight="bold" color="#fff">
                Bank Account
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" color="#fff">
                $6,400.00
              </Typography>
            </Box>

            {/*Bank Sub-account Card */}
            {bankAccounts.map((account) => (
              <AccountDetailCard key={account._id} {...account} />
            ))}
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Home;
