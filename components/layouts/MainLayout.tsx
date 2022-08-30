import { FC, ReactNode } from "react";
import Head from "next/head";
import { BottomNavigator } from "../ui/_shared/BottomNavigator";
import { TransitionSlide } from "../ui/_shared/transitions";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";

interface Props {
  children: ReactNode;
}

export const MainLayout: FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Chase - Demo</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta
          name="description"
          content="This is a pwa demo inspired in chase web app."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TransitionSlide>
        <Box sx={{ height: "100vh" }}>{children}</Box>
      </TransitionSlide>

      <BottomNavigator />
    </>
  );
};
