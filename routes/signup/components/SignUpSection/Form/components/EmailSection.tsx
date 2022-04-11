import { Box, Heading, VStack } from "@chakra-ui/react";
import { DescriptionText, FormField } from "components";
import { useTranslation } from "next-i18next";

export default function EmailSection() {
  const { t } = useTranslation(["signup"]);

  return (
    <Box
      as="section"
      border="1px"
      borderColor="gray.200"
      borderRadius="2xl"
      px="3"
      pb="4"
      w="full"
    >
      <Heading
        display="inline-block"
        position="absolute"
        backgroundColor="white"
        as="h2"
        px="1.5"
        mt="-0.6rem"
        fontSize="md"
        _after={{ content: '"*"', color: "red", ml: "1" }}
      >
        {t("signupForm.email.label")}
      </Heading>
      <DescriptionText mt="4">{t("signupForm.email.helper")}</DescriptionText>
      <VStack spacing="3">
        <FormField
          mt="2"
          name="email"
          placeholder={t("signupForm.email.label")}
          hideLabel
          label={t("signupForm.email.label")}
          isRequired
        />
        <FormField
          name="confirmEmail"
          placeholder={t("signupForm.emailVerify.label")}
          label={t("signupForm.emailVerify.label")}
          hideLabel
          isRequired
          helperPosition="before"
        />
      </VStack>
    </Box>
  );
}
