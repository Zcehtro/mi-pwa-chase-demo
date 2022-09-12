import { useContext, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Drawer, Typography, Button, Accordion, AccordionSummary } from "@mui/material";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { MainLayout } from "../components/layouts/MainLayout";
import { bankAccounts } from "../data";
import { UIContext } from "../context/ui";
import { USERContext } from "../context/user";
import { AccountDetailCard } from "../components/ui/index/AccountDetailCard";
import { NotificationCard } from "../components/ui/index/NotificationCard";
import { PageHeader } from "../components/ui/_shared/PageHeader";
import { signIn } from "next-auth/react";

const Home: NextPage = () => {
  const router = useRouter();

  const goToSignIn = (e: any) => {
    router.push("http://localhost:3000/auth/signin");
  };

  return (
    <>
      <Typography>Chase Banking Demo</Typography>

      <Button onClick={goToSignIn}>Go to Sign In</Button>
    </>
  );
};

export default Home;
