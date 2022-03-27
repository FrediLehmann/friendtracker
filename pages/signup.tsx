import { NextPage } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { withAuthProhibited } from "utils/withAuthProhibited";
import { SignUpPage } from "components";

export const getServerSideProps = withAuthProhibited({
  redirectTo: "/profile",
  async getServerSideProps({ locale = "en" }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "signup"])),
      },
    };
  },
});

const Signup: NextPage = () => {
  const { t } = useTranslation(["signup"]);

  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <SignUpPage />
    </>
  );
};

export default Signup;
