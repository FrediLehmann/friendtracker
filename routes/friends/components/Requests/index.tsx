import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { Avatar } from "components";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "store/user";

interface FriendList {
  id: number;
  user_id: string;
  user_name?: string;
  avatar_url?: string;
  profile_hash: string;
}

export default function Requests() {
  const { t } = useTranslation("friends");

  const { user } = useUser();

  const { id } = useSelector(getUserProfile);

  const [friendRequests, setFriendRequests] = useState<FriendList[]>();
  useEffect(() => {
    const getRequests = async () => {
      const { data: requests, error: requestsError } = await supabaseClient
        .from("friend_requests")
        .select("requestor")
        .eq("receiver", id);

      if (requestsError || !requests || requests.length < 1) return;

      const { data, error } = await supabaseClient
        .from("user_profiles")
        .select("id, user_id, user_name, avatar_url, profile_hash")
        .in(
          "id",
          requests.map((req) => req.requestor)
        );

      if (error) throw error;

      setFriendRequests(data || []);
    };

    user && id && getRequests();
  }, [user, id]);

  const acceptRequest = async (id: number) => {
    const { error } = await supabaseClient.rpc("approve_friend_request", {
      request_sender: id,
    });

    if (error) throw error;
  };

  const denyRequest = async (id: number) => {
    const { error } = await supabaseClient.rpc("deny_friend_request", {
      request_sender: id,
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
              onClick={() => acceptRequest(request.id)}
            >
              Accept
            </Button>
            <Button onClick={() => denyRequest(request.id)}>Reject</Button>
          </ButtonGroup>
        </Flex>
      ))}
    </Box>
  ) : null;
}
