import { Box, Container, Flex, Spacer } from "@chakra-ui/react";
import { FullHeader, FriendList, RecommendedList } from "components";
import AddFriend from "components/AddFriend";
import { NextPage } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["friends", "common"])),
    },
  };
}

const Friends: NextPage = () => {
  const { t } = useTranslation(["friends", "common"]);
  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <FullHeader />
      <Container as="main" layerStyle="pageContainer" maxW="container.lg">
        <Flex layerStyle="pageContent" gap="3">
          <Box w="full">
            <AddFriend />
            <FriendList />
          </Box>
          {/* <Spacer />
          <RecommendedList /> */}
        </Flex>
      </Container>
    </>
  );
};

export default Friends;
