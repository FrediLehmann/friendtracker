import { PageFrame } from "components";
import { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { EmailSection, GeneralSection, PhoneSection } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, getUserProfile } from "store/user";
import { useEffect } from "react";

const Profile: NextPage = () => {
  const { t } = useTranslation(["profile", "common"]);
  const dispatch = useDispatch();
  const profile = useSelector(getUserProfile);

  useEffect(() => {
    if (profile.state === "init") dispatch(fetchUserProfile());
  }, [profile, dispatch]);

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
