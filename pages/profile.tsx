import Profile from "routes/profile";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";

export const getServerSideProps = withAuthRequired({
  async getServerSideProps({ locale = "en" }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "profile"])),
      },
    };
  },
});

export default Profile;
