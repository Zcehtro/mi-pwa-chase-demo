import { FC, ReactNode } from "react";
import Head from "next/head";
import { Box } from "@mui/material";


interface Props {
  children: ReactNode;
}

export const SecondaryLayout: FC<Props> = ({ children }) => {
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

      <Box sx={{ height: "100vh" }}>{children}</Box>
    </>
  );
};
