import { FC, ReactNode } from "react";
import Head from "next/head";

interface Props {
  children: ReactNode;
}

export const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Chase - Signin</title>
        <meta
          name="description"
          content="This is a pwa demo inspired in chase web app."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
};
