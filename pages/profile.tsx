import Profile from "routes/profile";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { withPageAuth } from "@supabase/supabase-auth-helpers/nextjs";

export const getServerSideProps = withPageAuth({
  async getServerSideProps({ locale = "en" }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "profile"])),
      },
    };
  },
});

export default Profile;
