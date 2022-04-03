import { Box, Link, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";

export default function RegisterSection() {
  const { t } = useTranslation("login");
  return (
    <Box
      as="section"
      w="full"
      mt={["3", "5"]}
      px={["3", "5"]}
      py={["3", "4"]}
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.200"
      fontSize="sm"
    >
      <Text>
        {t("notRegistered")}{" "}
        <NextLink href="/signup" passHref>
          <Link color="blue.500">{t("createAccount")}</Link>
        </NextLink>
      </Text>
    </Box>
  );
}
