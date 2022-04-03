import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ToS from "routes/tos";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "tos"])),
    },
  };
}

export default ToS;
