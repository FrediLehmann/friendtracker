import { Heading, useBreakpointValue } from "@chakra-ui/react";
import { Description, SignUpForm } from "components";
import { useTranslation } from "next-i18next";

export default function SignUp() {
  const { t } = useTranslation(["signup"]);
  const smallScreen = useBreakpointValue({ base: true, sm: false });

  return (
    <>
      <Heading as="h1" size="lg" mt={smallScreen ? "1" : ""} mb={["3", "8"]}>
        {t("signup")}
      </Heading>
      <Description mb={["4", "6"]}>{t("signupDescription")}</Description>
      <SignUpForm />
    </>
  );
}
