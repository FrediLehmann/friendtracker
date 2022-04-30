import {
  Avatar,
  Button,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Plus } from "icons";
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
  const loading = useSelector(getUserLoginLoadingState);
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

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
      align={["start", "center"]}
      direction={["column", "row"]}
      justify="space-between"
    >
      <Flex gap="2" align="center" mr="5">
        <Avatar src={publicUrl} name={name} size={buttonSize} />
        <Text fontSize={["sm", "md"]} mr="5" fontWeight="bold" isTruncated>
          {name} aklsdfj alskdflkas dfasdfmiso sdf
        </Text>
      </Flex>
      <Button leftIcon={<Plus boxSize="5" />} size={buttonSize} mr="8">
        Add
      </Button>
    </Flex>
  );
}
