import { Link, Text } from "@chakra-ui/react";
import { CheckBoxField } from "components";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";

export default function ToSSection() {
  const { t } = useTranslation(["signup"]);

  return (
    <CheckBoxField name="tosAgreement" label={t("signupForm.tos.label")}>
      <Text fontSize={["sm", "md"]}>
        {t("signupForm.tos.checkbox.agree")}{" "}
        <NextLink href="/tos" passHref>
          <Link color="blue.500">{t("signupForm.tos.checkbox.link")}</Link>
        </NextLink>{" "}
        {t("signupForm.tos.checkbox.signup")}
      </Text>
    </CheckBoxField>
  );
}
