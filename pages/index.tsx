import { useContext, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Drawer, Typography } from "@mui/material";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { MainLayout } from "../components/layouts";
import { bankAccounts } from "../data";
import { UIContext } from "../context/ui";
import { USERContext } from "../context/user";
import {
  AccountDetailCard,
  NotificationCard,
  PageHeader,
} from "../components/ui";

const Home: NextPage = () => {
  const { drawerOpen, toggleDrawer } = useContext(UIContext);
  const { isLoggedIn, email, password, id } = useContext(USERContext);
  const router = useRouter();

  const toggleDrawerVisibility = (e: any) => {
    //get the id of the clicked element
    const id = e.target.id;
    toggleDrawer(!drawerOpen);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin");
    }
  }, [isLoggedIn]);

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
          icon={faStar}
          onClick={toggleDrawerVisibility}
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
              minHeight: "calc(100vh - 370px)",
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
              <Typography variant="subtitle1" color="#fff">
                $6,400.00
              </Typography>
            </Box>

            {/*Bank Sub-account Card */}
            {bankAccounts.map(account => (
              <AccountDetailCard
                key={account._id}
                {...account}
                onClick={toggleDrawerVisibility}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={toggleDrawerVisibility}
      >
        <Typography variant="h5" fontWeight="bold" color="#555">
          Drawer content goes here
        </Typography>
      </Drawer>
    </MainLayout>
  );
};

export default Home;
