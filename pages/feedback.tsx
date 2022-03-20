import { Container } from "@chakra-ui/react";
import { FullHeader } from "components";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "feedback"])),
    },
  };
}

const Feedback: NextPage = () => {
  const { t } = useTranslation(["feedback", "common"]);
  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <FullHeader />
      <Container as="main" layerStyle="pageContainer" maxW="container.lg">
        Feedback
      </Container>
    </>
  );
};

export default Feedback;