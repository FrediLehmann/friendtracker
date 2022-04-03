import { PageFrame } from "components";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const About: NextPage = () => {
  const { t } = useTranslation(["about", "common"]);
  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <PageFrame>- mission - funding - founder</PageFrame>
    </>
  );
};

export default About;
