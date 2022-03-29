import {
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { LanguageSelect } from "components";
import { DollarSign, Github } from "components/Icons";
import { useTranslation } from "next-i18next";

export default function MinimalHeader() {
  const { t } = useTranslation("common");
  const buttonVariant = useBreakpointValue({
    base: "icon",
    md: "full",
  });

  return (
    <Container
      py={["2", "4"]}
      as="header"
      maxW="container.xl"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading as="p" fontSize="md">
        Friend Tracker
      </Heading>
      {buttonVariant === "full" ? (
        <Flex gap="2">
          <Button variant="ghost" gap="2">
            <Github boxSize="4" />
            <Text>{t("headerMinimal.contribute")}</Text>
          </Button>
          <Button variant="ghost" gap="2">
            <DollarSign boxSize="4" />
            <Text>{t("headerMinimal.pricing")}</Text>
          </Button>
          <LanguageSelect />
        </Flex>
      ) : (
        <Flex gap="1">
          <IconButton
            variant="ghost"
            icon={<Github boxSize="4" />}
            aria-label={t("headerMinimal.contribute")}
          />
          <IconButton
            variant="ghost"
            icon={<DollarSign boxSize="4" />}
            aria-label={t("headerMinimal.pricing")}
          />
          <LanguageSelect />
        </Flex>
      )}
    </Container>
  );
}
