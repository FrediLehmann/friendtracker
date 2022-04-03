import { Heading, Link, useBreakpointValue } from "@chakra-ui/react";
import { DescriptionText, PageFrame, SignUpForm } from "components";
import { ArrowLeft } from "components/Icons";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";

export default function SignUpPage() {
  const { t } = useTranslation(["signup"]);
  const smallScreen = useBreakpointValue({ base: true, sm: false });

  return (
    <PageFrame size="small">
      <NextLink href="/" passHref>
        <Link
          display="block"
          mr="auto"
          color="blue.500"
          fontSize={["sm", "md"]}
        >
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
      <DescriptionText mb={["4", "6"]}>
        {t("signupDescription")}
      </DescriptionText>
      <SignUpForm />
    </PageFrame>
  );
}
