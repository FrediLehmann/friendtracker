import {
  Avatar,
  Box,
  Circle,
  Divider,
  Flex,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { AlertTriangle, Check, X } from "components/Icons";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";

type Status = "ok" | "nok";

const StatusComponent = ({ status }: { status: Status }) => {
  switch (status) {
    case "ok":
      return (
        <Circle size="20px" bg="green.400" color="white">
          <Check boxSize="3" />
        </Circle>
      );
    case "nok":
      return (
        <Circle size="20px" bg="red.400" color="white">
          <AlertTriangle boxSize="3" />
        </Circle>
      );
    default:
      return (
        <Circle size="20px" bg="green.400" color="white">
          <Check boxSize="3" />
        </Circle>
      );
  }
};

export default function Friend({
  name,
  url,
  lastSignIn,
  status,
}: {
  name: string;
  url: string;
  lastSignIn: string;
  status: Status;
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
        <Avatar />
        <Box overflow="hidden">
          <Flex gap="3" alignItems="center">
            <Heading size="sm" isTruncated>
              <NextLink href={`/friends/${url}`} passHref>
                <LinkOverlay>{name}</LinkOverlay>
              </NextLink>
            </Heading>
            <StatusComponent status={status} />
          </Flex>
          <Text color="gray.600" fontSize="xs">
            {t("friendList.lastOnline")} {lastSignIn}
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
