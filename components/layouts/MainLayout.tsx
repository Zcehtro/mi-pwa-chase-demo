import { FC, ReactNode } from "react";
import Head from "next/head";
import { BottomNavigator } from "../ui";

interface Props {
  children: ReactNode;
}

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Chase - Demo</title>
        <meta
          name="description"
          content="This is a pwa demo inspired in chase web app."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <BottomNavigator />
    </>
  );
};
