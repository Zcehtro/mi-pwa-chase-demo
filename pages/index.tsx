import { useContext, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Drawer, Typography, Button } from "@mui/material";
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
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#555" }}>
            Accounts
          </Typography>

          {/* Overview */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            sx={{
              bgcolor: "#F3FAFF",
              borderRadius: 2,
              border: "1px solid rgb(0, 110, 215, 0.6)",
              mb: 1,
            }}
          >
            {/* Overview title */}
            <Box p={2}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="primary"
                sx={{ opacity: 0.6 }}
              >
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
                Bank Accounts
              </Typography>
              <Typography variant="subtitle1" color="#fff">
                $10,120.00
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

          {/* Movements */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            sx={{
              borderRadius: 2,
              border: "1px solid rgb(0, 110, 215, 0.6)",
              mb: 1,
            }}
          >
            {/* Movements title */}
            <Box p={2}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="primary"
                sx={{ opacity: 0.6 }}
              >
                Movements
              </Typography>
              <Typography
                variant="caption"
                fontSize="10px"
                sx={{ color: "#888" }}
              >
                This field is only a placeholder for the sake of this example.
              </Typography>
            </Box>
          </Box>
          {/* Auto-debit */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            sx={{
              borderRadius: 2,
              border: "1px solid rgb(0, 110, 215, 0.6)",
              mb: 1,
            }}
          >
            {/* Movements title */}
            <Box p={2}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="primary"
                sx={{ opacity: 0.6 }}
              >
                Auto Debit
              </Typography>
              <Typography
                variant="caption"
                fontSize="10px"
                sx={{ color: "#888" }}
              >
                This field is another placeholder for the sake of this example.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {/*Basic drawer placeholder */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={toggleDrawerVisibility}
      >
        <Typography
          variant="h6"
          fontSize="16px"
          fontWeight="bold"
          color="#555"
          textAlign="center"
          sx={{ mt: 2, px: 2 }}
        >
          You&apos;re looking a placeholder because this feature is not yet
          implemented.
        </Typography>
        <Typography
          variant="subtitle1"
          fontSize="13px"
          color="#999"
          textAlign="center"
        >
          Maybe you can add your bank account details here later.
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" disabled>
            Add Bank Account
          </Button>
        </Box>
        <Typography variant="caption" color="#999" textAlign="center" mb={2}>
          This feature isn&apos;t available yet.
        </Typography>
      </Drawer>
    </MainLayout>
  );
};

export default Home;
