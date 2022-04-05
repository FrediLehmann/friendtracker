import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Send, X } from "icons";
import { useTranslation } from "next-i18next";

export default function UnavailableFriend({
  identifier,
}: {
  identifier: string;
}) {
  const { t } = useTranslation("friends");
  const smallScreen = useBreakpointValue({ base: true, md: false });
  return (
    <Flex layerStyle="card" bg="white" gap="4" alignItems="center">
      <Avatar>
        <AvatarBadge borderColor="red.100" bg="red.400" boxSize="1.25em" />
      </Avatar>
      <Box overflow="hidden">
        <Heading size="sm" isTruncated>
          {identifier}
        </Heading>
        <Text color="gray.600" fontSize="xs">
          {t("friendList.noMember")}
        </Text>
      </Box>
      {smallScreen ? (
        <IconButton
          aria-label={t("friendList.sendInvite")}
          icon={<Send boxSize="4" />}
          size="sm"
        />
      ) : (
        <Button rightIcon={<Send boxSize="4" />} size="sm">
          {t("friendList.sendInvite")}
        </Button>
      )}
      <Spacer />
      <Flex h="40px" align="center">
        <Divider orientation="vertical" mr="3" />
        <IconButton
          size="sm"
          aria-label={t("friendList.removeFriend")}
          icon={<X boxSize="4" />}
          variant="ghost"
        />
      </Flex>
    </Flex>
  );
}
