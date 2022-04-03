import { PageFrame } from "components";
import { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { EmailSection, GeneralSection, PhoneSection } from "./components";

const Profile: NextPage = () => {
  const { t } = useTranslation(["profile", "common"]);
  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <PageFrame>
        <GeneralSection />
        <EmailSection />
        <PhoneSection />
      </PageFrame>
    </>
  );
};

export default Profile;
