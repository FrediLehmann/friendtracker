import Newsfeed from "routes/newsfeed";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { withPageAuth } from "@supabase/supabase-auth-helpers/nextjs";

export const getServerSideProps = withPageAuth({
  async getServerSideProps({ locale = "en" }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "newsfeed"])),
      },
    };
  },
});

export default Newsfeed;
