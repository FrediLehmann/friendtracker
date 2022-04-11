import { Box, Heading, VStack } from "@chakra-ui/react";
import { FormField } from "components";
import { useTranslation } from "next-i18next";

export default function PasswordSection() {
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
        {t("signupForm.password.label")}
      </Heading>
      <VStack spacing="3" mt="5">
        <FormField
          name="password"
          type="password"
          label={t("signupForm.password.label")}
          placeholder={t("signupForm.password.label")}
          hideLabel
          isRequired
        />
        <FormField
          name="confirmPassword"
          type="password"
          label={t("signupForm.passwordVerify.label")}
          placeholder={t("signupForm.passwordVerify.label")}
          hideLabel
          isRequired
        />
      </VStack>
    </Box>
  );
}
