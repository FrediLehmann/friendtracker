import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Signup from "routes/signup";
import { withAuthProhibited } from "utils/withAuthProhibited";

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

export default Signup;
