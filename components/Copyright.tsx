import { Box, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";

export default function Copyright() {
  const { t } = useTranslation("common");
  return (
    <Box as="section" textAlign="center" fontSize="xs" color="gray.500" py="4">
      <Text>© Copyright {new Date().getFullYear()} by Frederic Lehmann,</Text>
      <Text mb="1">all rights reserved.</Text>
      <Flex display="inline-flex" gap="2">
        <NextLink href="/about" passHref>
          <Link>{t("copyright.aboutLink")}</Link>
        </NextLink>
        <NextLink href="/tos" passHref>
          <Link>{t("copyright.tosLink")}</Link>
        </NextLink>
      </Flex>
    </Box>
  );
}
