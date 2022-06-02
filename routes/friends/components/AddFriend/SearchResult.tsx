import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Avatar } from "components";
import { useTranslation } from "next-i18next";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPendingFriendRequests } from "store/friends";
import { getUserProfile } from "store/user";

export default function SearchResult({
  name,
  avatarUrl,
  matchId,
  resetSearch,
}: {
  name?: string;
  avatarUrl?: string;
  matchId: number;
  resetSearch: () => void;
}) {
  const toast = useToast();
  const { t } = useTranslation("friends");

  const dispatch = useDispatch();
  const { id } = useSelector(getUserProfile);

  async function requestFriend(
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>
  ) {
    e.preventDefault();
    const { error } = await supabaseClient
      .from("friend_requests")
      .insert({ requestor: id, receiver: matchId });

    if (error) {
      toast({
        title: t("friendRequests.createRequestErrorToastTitle"),
        description: t("friendRequests.createRequestErrorToastDescription"),
        status: "error",
        isClosable: true,
      });

      return;
    }

    dispatch(loadPendingFriendRequests());
    resetSearch();
  }

  return (
    <Flex
      gap="2"
      align="center"
      px="2"
      py="1"
      borderRadius="sm"
      onClick={requestFriend}
      _hover={{ backgroundColor: "gray.100", cursor: "pointer" }}
    >
      <Avatar url={avatarUrl} name={name} size="md" />
      <Text fontSize={["sm", "md"]} fontWeight="bold" isTruncated>
        {name}
      </Text>
      <Button variant="link" ml="auto" size="sm">
        {t("addFriend.add")}
      </Button>
    </Flex>
  );
}
