import { Button, Flex, Text } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Avatar } from "components";
import { useTranslation } from "next-i18next";
import React from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "store/user";

export default function SearchResult({
  name,
  avatarUrl,
  userHash,
  resetSearch,
}: {
  name?: string;
  avatarUrl?: string;
  userHash: string;
  resetSearch: () => void;
}) {
  const { t } = useTranslation("friends");
  const { profile_hash } = useSelector(getUserProfile);

  async function requestFriend(
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>
  ) {
    e.preventDefault();
    const { error } = await supabaseClient.rpc("send_friend_request", {
      sender: profile_hash,
      receiver: userHash,
    });

    if (!error) resetSearch();
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
