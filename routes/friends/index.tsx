import { PageFrame } from "components";
import { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { AddFriend, FriendList, Requests } from "./components";

const Friends: NextPage = () => {
  const { t } = useTranslation(["friends"]);
  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <PageFrame>
        <AddFriend />
        <Requests />
        <FriendList />
      </PageFrame>
    </>
  );
};

export default Friends;
