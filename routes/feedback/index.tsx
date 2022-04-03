import { PageFrame } from "components";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const Feedback: NextPage = () => {
  const { t } = useTranslation(["feedback", "common"]);
  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <PageFrame>Feedback</PageFrame>
    </>
  );
};

export default Feedback;
