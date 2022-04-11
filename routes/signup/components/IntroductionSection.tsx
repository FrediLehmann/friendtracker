import { Heading, Link, useBreakpointValue } from "@chakra-ui/react";
import { DescriptionText } from "components";
import { ArrowLeft } from "icons";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";

export default function IntroductionSection() {
  const { t } = useTranslation(["signup"]);
  const smallScreen = useBreakpointValue({ base: true, sm: false });

  return (
    <section>
      <NextLink href="/" passHref>
        <Link mr="auto" color="blue.500" fontSize={["sm", "md"]} p="1">
          <ArrowLeft boxSize={["3", "4"]} mb={["0.5", "1"]} /> {t("return")}
        </Link>
      </NextLink>
      {!smallScreen && (
        <Heading as="h2" size="sm" mt="3" mb="2">
          Friend Tracker
        </Heading>
      )}
      <Heading as="h1" size="lg" mt={smallScreen ? "1" : ""} mb={["3", "8"]}>
        {t("signup")}
      </Heading>
    </section>
  );
}
