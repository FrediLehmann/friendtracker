import { Link, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";

export default function Unregistered() {
  const { t } = useTranslation(["login"]);

  return (
    <Text fontSize={["sm", "md"]}>
      {t("notRegistered")}{" "}
      <NextLink href="/signup" passHref>
        <Link color="blue.500">{t("createAccount")}</Link>
      </NextLink>
    </Text>
  );
}
