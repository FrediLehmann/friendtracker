import { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { PageFrame } from "components";
import { IntroductionSection, SignUpSection } from "./components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getUserLoggedIn } from "store/user";
import { useEffect } from "react";

const Signup: NextPage = () => {
  const { t } = useTranslation(["signup"]);
  const router = useRouter();
  const isLoggedIn = useSelector(getUserLoggedIn);

  useEffect(() => {
    isLoggedIn && router.push("/profile");
  }, [router, isLoggedIn]);

  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <PageFrame size="small">
        <IntroductionSection />
        <SignUpSection />
      </PageFrame>
    </>
  );
};

export default Signup;
