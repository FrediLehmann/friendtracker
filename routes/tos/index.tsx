import { PageFrame } from "components";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";

const ToS: NextPage = () => {
  const { t } = useTranslation(["tos", "common"]);
  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <PageFrame>Comming soon</PageFrame>
    </>
  );
};

export default ToS;
