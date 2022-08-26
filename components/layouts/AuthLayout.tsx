import { FC, ReactNode } from "react";
import Head from "next/head";
import { Typography } from "@mui/material";

interface Props {
  children: ReactNode;
}

export const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Chase - Signin</title>
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
      <main>{children}</main>
      <footer
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "80px",
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        <Typography
          variant="body1"
          fontSize="10px"
          color="textSecondary"
          align="center"
        >
          Lorem Ipsum Dolor
        </Typography>
        <Typography
          variant="body1"
          fontSize="10px"
          color="textSecondary"
          align="center"
        >
          Eexcepturi dolorum facere doloremque saepe illo voluptatibus. Ratione,
          doloremque!
        </Typography>
        <Typography
          variant="body1"
          fontSize="10px"
          color="textSecondary"
          align="center"
        >
          &copy; {new Date().getFullYear()} Magenta Innova
        </Typography>
      </footer>
    </>
  );
};
