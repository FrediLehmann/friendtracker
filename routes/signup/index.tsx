import { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { PageFrame } from "components";
import { IntroductionSection, SignUpSection } from "./components";

const Signup: NextPage = () => {
  const { t } = useTranslation(["signup"]);

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
