import type { NextPage } from "next";
import Head from "next/head";
import { Copyright, PageFrame } from "components";
import { useTranslation } from "next-i18next";
import { Center } from "@chakra-ui/react";
import {
  ExternalSignInSection,
  IntroductionSection,
  RegisterSection,
  SignInSection,
} from "./components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getUserLoggedIn } from "store/user";
import { useEffect } from "react";

const Index: NextPage = () => {
  const { t } = useTranslation(["login"]);
  const router = useRouter();
  const isLoggedIn = useSelector(getUserLoggedIn);

  useEffect(() => {
    isLoggedIn && router.push("/profile");
  }, [router, isLoggedIn]);

  return (
    <>
      <Head>
        <title>Friend Tracker</title>
        <meta name="description" content={t("description")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
