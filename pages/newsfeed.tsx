import Newsfeed from "routes/newsfeed";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";

export const getServerSideProps = withAuthRequired({
  async getServerSideProps({ locale = "en" }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "newsfeed"])),
      },
    };
  },
});

export default Newsfeed;
