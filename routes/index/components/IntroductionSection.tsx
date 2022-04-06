import { Box, Heading, useBreakpointValue } from "@chakra-ui/react";
import { DescriptionText } from "components";
import { useTranslation } from "next-i18next";

export default function IntroductionSection() {
  const { t } = useTranslation(["login"]);
  const headingHidden = useBreakpointValue({ base: true, sm: false });

  return (
    <Box as="section" mt={headingHidden ? "2" : ""}>
      <Heading
        as="h1"
        hidden={headingHidden}
        size="lg"
        mb={["3", "8"]}
        alignSelf="start"
      >
        Friend Tracker
      </Heading>
      <DescriptionText mb={["4", "6"]}>{t("loginText")}</DescriptionText>
    </Box>
  );
}
