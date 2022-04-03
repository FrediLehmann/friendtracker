import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";
import Friend from "routes/friend";

export const getServerSideProps = withAuthRequired({
  async getServerSideProps({ locale = "en" }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "friends"])),
      },
    };
  },
});

export default Friend;
