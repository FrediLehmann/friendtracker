import {
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
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Avatar } from "components";
import { X } from "icons";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loadFriends, loadPendingFriendRequests } from "store/friends";
import { getUserProfile } from "store/user";

export default function Friend({
  name,
  id,
  url,
  avatar_url,
  isPending = false,
}: {
  name: string;
  id: number;
  url: string;
  avatar_url: string;
  isPending?: boolean;
}) {
  const { t } = useTranslation("friends");

  const dispatch = useDispatch();
  const { id: userId } = useSelector(getUserProfile);

  const removeFriend = async () => {
    if (isPending) {
      await supabaseClient
        .from("friend_requests")
        .delete()
        .eq("requestor", userId)
        .eq("receiver", id);

      dispatch(loadPendingFriendRequests());
    } else {
      await supabaseClient.rpc("remove_friend", { friend: id });
      dispatch(loadFriends());
    }
  };

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
        <Avatar url={avatar_url} name={name}>
          {isPending && (
            <AvatarBadge
              borderColor="orange.100"
              bg="orange.400"
              boxSize="1.25em"
            />
          )}
        </Avatar>
        <Box overflow="hidden">
          <Heading size="sm" isTruncated>
            <NextLink href={`/friends/${url}`} passHref>
              <LinkOverlay>{name}</LinkOverlay>
            </NextLink>
          </Heading>
          {isPending && (
            <Text color="gray.600" fontSize="xs">
              {t("friendList.pendingRequest")}
            </Text>
          )}
        </Box>
      </LinkBox>
      <Flex h="40px" align="center" mr={["3", "5"]}>
        <Divider orientation="vertical" mr="3" />
        <IconButton
          size="sm"
          aria-label={t("friendList.removeFriend")}
          icon={<X boxSize="4" />}
          variant="ghost"
          onClick={removeFriend}
        />
      </Flex>
    </Flex>
  );
}
