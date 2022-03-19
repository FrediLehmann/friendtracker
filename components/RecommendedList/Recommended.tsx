import { Flex, IconButton, Spacer, Text } from "@chakra-ui/react";
import { Plus } from "components/Icons";
import { useTranslation } from "next-i18next";

export default function Recommended({ name }: { name: string }) {
  const { t } = useTranslation("friends");
  return (
    <Flex my="1" gap="2" alignItems="center">
      <Text fontSize="sm">{name}</Text>
      <Spacer />
      <IconButton
        size="xs"
        aria-label={t("recommendedFriends.addRecommendedFriend", { name })}
        icon={<Plus boxSize="3" />}
        variant="outline"
      />
    </Flex>
  );
}
