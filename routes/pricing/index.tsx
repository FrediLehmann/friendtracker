import { Button, ButtonGroup, Heading, Text } from "@chakra-ui/react";
import { PageFrame } from "components";
import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { CreditCard } from "components/Icons";

const Pricing: NextPage = () => {
  const { t } = useTranslation(["pricing", "common"]);
  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <PageFrame>
        <Heading as="h1">{t("content.mainHeading")}</Heading>
        <Heading as="h2" size="lg" maxW={["full", null, "75%"]} mt="6" mb="4">
          {t("content.secondaryHeading")}
        </Heading>
        <Text>{t("content.firstText")}</Text>
        <Heading as="h3" size="md" maxW={["full", null, "75%"]} mt="8" mb="4">
          {t("content.donateHeading")}
        </Heading>
        <Text>{t("content.donateText")}</Text>
        <Button leftIcon={<CreditCard boxSize="5" />} colorScheme="blue" mt="6">
          {t("content.donateButton")}
        </Button>
        <Heading as="h3" size="md" maxW={["full", null, "75%"]} mt="10" mb="4">
          {t("content.startUsingHeading")}
        </Heading>
        <Text>{t("content.startUsingText")}</Text>
        <ButtonGroup>
          <Button colorScheme="blue" mt="6">
            {t("content.signIn")}
          </Button>
          <Button variant="link" colorScheme="blue" mt="6">
            {t("content.signUp")}
          </Button>
        </ButtonGroup>
      </PageFrame>
    </>
  );
};

export default Pricing;
