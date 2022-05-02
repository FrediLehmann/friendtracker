import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserLoginLoadingState, getUserProfile } from "store/user";

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
  const loading = useSelector(getUserLoginLoadingState);
  const { profile_hash } = useSelector(getUserProfile);

  const [publicUrl, setPublicUrl] = useState<string | undefined>();

  useEffect(() => {
    const fetchSignedUrl = async () => {
      if (!avatarUrl) return;

      const { publicURL, error } = supabaseClient.storage
        .from("avatars")
        .getPublicUrl(avatarUrl);

      if (error) throw error;

      setPublicUrl(publicURL || "");
    };

    if (!loading) fetchSignedUrl();
  }, [loading, avatarUrl]);

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
      <Avatar src={publicUrl} name={name} size="md" />
      <Text fontSize={["sm", "md"]} fontWeight="bold" isTruncated>
        {name}
      </Text>
      <Button variant="link" ml="auto" size="sm">
        {t("addFriend.add")}
      </Button>
    </Flex>
  );
}
