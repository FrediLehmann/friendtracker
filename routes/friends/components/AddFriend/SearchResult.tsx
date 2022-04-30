import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserLoginLoadingState } from "store/user";

export default function SearchResult({
  name,
  avatarUrl,
}: {
  name?: string;
  avatarUrl?: string;
}) {
  const { t } = useTranslation("friends");
  const loading = useSelector(getUserLoginLoadingState);

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

  return (
    <Flex
      gap="2"
      align="center"
      px="2"
      py="1"
      borderRadius="sm"
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
