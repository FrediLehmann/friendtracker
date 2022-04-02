import { Container } from "@chakra-ui/react";
import { Header } from "components";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";

export const getServerSideProps = withAuthRequired({
  async getServerSideProps({ locale = "en" }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "feedback"])),
      },
    };
  },
});

const Feedback: NextPage = () => {
  const { t } = useTranslation(["feedback", "common"]);
  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <Header />
      <Container as="main" layerStyle="pageContainer" maxW="container.lg">
        Feedback
      </Container>
    </>
  );
};

export default Feedback;
