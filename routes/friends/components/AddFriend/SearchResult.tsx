import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Avatar } from "components";
import { useTranslation } from "next-i18next";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPendingRequest } from "store/friends";
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
    const { data, error } = await supabaseClient
      .from("friend_requests")
      .insert({ requestor: id, receiver: matchId });

    if (error) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "error",
        isClosable: true,
      });

      return;
    }

    resetSearch();
    data && dispatch(addPendingRequest(data[0]));
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
