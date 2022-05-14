import { Avatar, Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "store/user";

interface FriendList {
  owner: string;
  user_name?: string;
  avatar_url?: string;
  profile_hash: string;
  friends: {
    request_status: string;
    initiator: string;
  }[];
}

export default function Requests() {
  const { t } = useTranslation("friends");

  const { user } = useUser();

  const { profile_hash } = useSelector(getUserProfile);

  const [friendRequests, setFriendRequests] = useState<FriendList[]>();

  useEffect(() => {
    const getRequests = async () => {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select(
          "owner, user_name, avatar_url, profile_hash, friends!friends_initiator_fkey!inner(request_status, initiator)"
        )
        .neq("friends.initiator", profile_hash);

      if (error) throw error;

      setFriendRequests(data);
    };

    user && profile_hash && getRequests();
  }, [user, profile_hash]);

  return friendRequests && friendRequests?.length > 0 ? (
    <Box>
      <Text fontWeight="bold">{t("friendRequests.title")}</Text>
      {friendRequests?.map((request) => (
        <Flex
          key={request.profile_hash}
          align="center"
          my="2"
          justify="space-between"
        >
          <Flex align="center">
            <Avatar mr="2" size="sm" />
            <Text>{request.user_name}</Text>
          </Flex>
          <ButtonGroup size="sm" spacing="4" variant="link">
            <Button colorScheme="blue">Accept</Button>
            <Button>Reject</Button>
          </ButtonGroup>
        </Flex>
      ))}
    </Box>
  ) : null;
}
