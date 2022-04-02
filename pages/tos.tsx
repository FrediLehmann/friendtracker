import { Container } from "@chakra-ui/react";
import { Header } from "components";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "tos"])),
    },
  };
}

const About: NextPage = () => {
  const { t } = useTranslation(["tos", "common"]);
  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <Header />
      <Container as="main" layerStyle="pageContainer" maxW="container.lg">
        Comming soon
      </Container>
    </>
  );
};

export default About;
