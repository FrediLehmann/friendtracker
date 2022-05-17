import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Home from "routes/index";
import { withAuthProhibited } from "utils/withAuthProhibited";

export const getServerSideProps = withAuthProhibited({
  redirectTo: "/newsfeed",
  async getServerSideProps({ locale = "en" }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["login", "common"])),
      },
    };
  },
});

export default Home;
