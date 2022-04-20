import { PageFrame } from "components";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const Pricing: NextPage = () => {
  const { t } = useTranslation(["newsfeed", "common"]);
  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <PageFrame>Newsfeed</PageFrame>
    </>
  );
};

export default Pricing;
