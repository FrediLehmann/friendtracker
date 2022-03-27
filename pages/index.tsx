import type { NextPage } from "next";
import Head from "next/head";
import { Home } from "components";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { withAuthProhibited } from "utils/withAuthProhibited";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const getServerSideProps = withAuthProhibited({
  redirectTo: "/profile",
  async getServerSideProps({ locale = "en" }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["login", "common"])),
      },
    };
  },
});

const Index: NextPage = () => {
  const { t } = useTranslation(["login"]);
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(() => {
      router.push("/profile");
    });

    return () => authListener?.unsubscribe();
  }, [router]);

  return (
    <>
      <Head>
        <title>Friend Tracker</title>
        <meta name="description" content={t("description")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
};

export default Index;
