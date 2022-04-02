import type { NextPage } from "next";
import Head from "next/head";
import { Copyright, Header, PageFrame } from "components";
import { useTranslation } from "next-i18next";
import { Center } from "@chakra-ui/react";
import {
  ExternalSignInSection,
  IntroductionSection,
  RegisterSection,
  SignInSection,
} from "./components";

const Index: NextPage = () => {
  const { t } = useTranslation(["login"]);

  return (
    <>
      <Head>
        <title>Friend Tracker</title>
        <meta name="description" content={t("description")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <PageFrame size="small">
        <Center flexDirection="column">
          <IntroductionSection />
          <SignInSection />
          <ExternalSignInSection />
          <RegisterSection />
          <Copyright />
        </Center>
      </PageFrame>
    </>
  );
};

export default Index;
