import {
  Badge,
  Box,
  Button,
  Flex,
  ListItem,
  Spacer,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Trash2 } from "icons";
import { useTranslation } from "next-i18next";

export default function EmailInfo({
  email,
  isPrimary = false,
}: {
  email: string;
  isPrimary?: boolean;
}) {
  const { t } = useTranslation("profile");
  return (
    <Box layerStyle="card">
      {isPrimary && (
        <Badge colorScheme="green" mb="1">
          {t("emailSection.primary")}
        </Badge>
      )}
      <Flex flexDirection={["column", null, "row"]}>
        <Flex flexDirection={["column", null, "row"]}>
          <Text as="b" fontSize="md" isTruncated>
            {email}
          </Text>
        </Flex>
        <Spacer />
        <Button
          variant="outline"
          size="sm"
          mt={["2", null, "0"]}
          w="min-content"
          leftIcon={<Trash2 boxSize="4" />}
        >
          {t("emailSection.remove")}
        </Button>
      </Flex>
      <UnorderedList fontSize="sm" color="gray.600" mt="3" px="4">
        {isPrimary && (
          <>
            <ListItem>{t("emailSection.info.loggedIn")}</ListItem>
            <ListItem>{t("emailSection.info.notifications")}</ListItem>
          </>
        )}
        <ListItem>{t("emailSection.info.findable")}</ListItem>
        <ListItem>{t("emailSection.info.contact")}</ListItem>
      </UnorderedList>
    </Box>
  );
}
