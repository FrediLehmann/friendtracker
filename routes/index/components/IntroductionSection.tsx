import { Heading, useBreakpointValue } from "@chakra-ui/react";
import { Description } from "components";
import { useTranslation } from "next-i18next";

export default function IntroductionSection() {
  const { t } = useTranslation(["login"]);
  const headingHidden = useBreakpointValue({ base: true, sm: false });

  return (
    <>
      <Heading
        as="h1"
        hidden={headingHidden}
        size="lg"
        mb={["3", "8"]}
        alignSelf="start"
      >
        Friend Tracker
      </Heading>
      <Description mb={["4", "6"]}>{t("loginText")}</Description>
    </>
  );
}
