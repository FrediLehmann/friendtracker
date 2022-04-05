import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { X } from "icons";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";

export default function PendingFriend({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  const { t } = useTranslation("friends");
  return (
    <Flex
      alignItems="center"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.200"
      bg="white"
      gap="3"
    >
      <LinkBox
        gap="3"
        display="flex"
        px={["3", "5"]}
        py={["3", "4"]}
        alignItems="center"
        w="full"
      >
        <Avatar>
          <AvatarBadge
            borderColor="orange.100"
            bg="orange.400"
            boxSize="1.25em"
          />
        </Avatar>
        <Box overflow="hidden">
          <Heading size="sm" isTruncated>
            <NextLink href={`/friends/${url}`} passHref>
              <LinkOverlay>{name}</LinkOverlay>
            </NextLink>
          </Heading>
          <Text color="gray.600" fontSize="xs">
            {t("friendList.pendingRequest")}
          </Text>
        </Box>
      </LinkBox>
      <Flex h="40px" align="center" mr={["3", "5"]}>
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