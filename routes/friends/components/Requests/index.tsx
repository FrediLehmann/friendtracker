import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { Avatar } from "components";
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
    id: number;
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
        .from("user_profiles")
        .select(
          "owner, user_name, avatar_url, profile_hash, friends!friends_initiator_fkey!inner(id, request_status, initiator)"
        )
        .eq("friends.request_status", "pending")
        .neq("friends.initiator", profile_hash);

      if (error) throw error;

      setFriendRequests(data || []);
    };

    user && profile_hash && getRequests();
  }, [user, profile_hash]);

  const acceptRequest = async (id: number) => {
    const { error } = await supabaseClient.rpc("approve_friend_request", {
      request_id: id,
    });

    if (error) throw error;
  };

  const denyRequest = async (id: number) => {
    const { error } = await supabaseClient.rpc("deny_friend_request", {
      request_id: id,
    });

    if (error) throw error;
  };

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
            <Avatar url={request.avatar_url} mr="2" size="sm" />
            <Text>{request.user_name}</Text>
          </Flex>
          <ButtonGroup size="sm" spacing="4" variant="link">
            <Button
              colorScheme="blue"
              onClick={() => acceptRequest(request.friends[0].id)}
            >
              Accept
            </Button>
            <Button onClick={() => denyRequest(request.friends[0].id)}>
              Reject
            </Button>
          </ButtonGroup>
        </Flex>
      ))}
    </Box>
  ) : null;
}
