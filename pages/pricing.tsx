import { Container } from "@chakra-ui/react";
import { MinimalHeader } from "components";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "pricing"])),
    },
  };
}

const Pricing: NextPage = () => {
  const { t } = useTranslation(["pricing", "common"]);
  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <MinimalHeader />
      <Container as="main" layerStyle="pageContainer" maxW="container.lg">
        Pricing
      </Container>
    </>
  );
};

export default Pricing;