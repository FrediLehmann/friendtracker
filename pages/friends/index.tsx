import { Box, Container, Flex } from "@chakra-ui/react";
import { Header, FriendList, AddFriend } from "components";
import { NextPage } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";

export const getServerSideProps = withAuthRequired({
  async getServerSideProps({ locale = "en" }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "friends"])),
      },
    };
  },
});

const Friends: NextPage = () => {
  const { t } = useTranslation(["friends", "common"]);
  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <Header />
      <Container as="main" layerStyle="pageContainer" maxW="container.lg">
        <Flex layerStyle="pageContent" gap="3">
          <Box w="full">
            <AddFriend />
            <FriendList />
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default Friends;
