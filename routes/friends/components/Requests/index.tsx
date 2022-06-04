import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { Avatar } from "components";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIncomingFriendRequests,
  getIncomingFriendRequestsLoadingState,
  loadFriends,
  loadIncomingFriendRequests,
} from "store/friends";
import { getUserProfile } from "store/user";
import { LoadingStates } from "types/DataStates.enum";

export default function Requests() {
  const { t } = useTranslation("friends");

  const { user } = useUser();

  const dispatch = useDispatch();

  const { state: profileLoadingState } = useSelector(getUserProfile);
  const incomingRequests = useSelector(getIncomingFriendRequests);
  const incomingRequestsState = useSelector(
    getIncomingFriendRequestsLoadingState
  );

  useEffect(() => {
    if (!user) return;
    if (
      incomingRequestsState === LoadingStates.loaded ||
      incomingRequestsState === LoadingStates.error
    )
      return;
    if (profileLoadingState !== LoadingStates.loaded) return;

    dispatch(loadIncomingFriendRequests());
  }, [dispatch, incomingRequestsState, profileLoadingState, user]);

  const acceptRequest = async (id: number) => {
    const { error } = await supabaseClient.rpc("approve_friend_request", {
      request_sender: id,
    });

    if (error) throw error;
    dispatch(loadIncomingFriendRequests());
    dispatch(loadFriends());
  };

  const denyRequest = async (id: number) => {
    const { error } = await supabaseClient.rpc("deny_friend_request", {
      request_sender: id,
    });

    if (error) throw error;
    dispatch(loadIncomingFriendRequests());
  };

  if (!incomingRequests || incomingRequests.length < 1) return null;

  return (
    <Box mb="6">
      <Text fontWeight="bold">{t("friendRequests.title")}</Text>
      {incomingRequests.map((request) => (
        <Flex
          key={request.profile_hash}
          align="center"
          my="2"
          justify="space-between"
        >
          <Flex align="center">
            <Avatar
              name={request.user_name}
              url={request.avatar_url}
              mr="2"
              size="sm"
            />
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
      <Divider my="4" />
    </Box>
  );
}
