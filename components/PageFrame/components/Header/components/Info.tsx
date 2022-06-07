import {
  Button,
  Flex,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DollarSign } from "icons";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function Info() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const buttonVariant = useBreakpointValue({
    base: "icon",
    md: "full",
  });

  if (buttonVariant === "full")
    return (
      <Flex gap="2" mr="2">
        <Button
          leftIcon={<DollarSign boxSize="4" />}
          variant="ghost"
          onClick={() => router.push("/pricing")}
        >
          <Text>{t("header.pricing")}</Text>
        </Button>
      </Flex>
    );

  return (
    <Flex gap="1" mr="1">
      <IconButton
        variant="ghost"
        icon={<DollarSign boxSize="4" />}
        aria-label={t("header.pricing")}
        onClick={() => router.push("/pricing")}
      />
    </Flex>
  );
}
