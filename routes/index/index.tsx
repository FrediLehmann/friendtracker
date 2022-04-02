import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "components";
import { useTranslation } from "next-i18next";

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
    </>
  );
};

export default Index;
