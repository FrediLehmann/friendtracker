import { Center, Flex, Text } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import friends, {
  getPendingFriendRequests,
  getPendingFriendRequestsLoadingState,
  loadPendingFriendRequests,
} from "store/friends";
import { getUserProfile } from "store/user";
import { LoadingStates } from "types/DataStates.enum";
import { Friend } from "./components";

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

export default function FriendList() {
  const { t } = useTranslation("friends");

  const { user } = useUser();

  const dispatch = useDispatch();

  const { state: profileLoadingState } = useSelector(getUserProfile);
  const pendingRequests = useSelector(getPendingFriendRequests);
  const pendingRequestsState = useSelector(
    getPendingFriendRequestsLoadingState
  );

  useEffect(() => {
    if (!user) return;
    if (
      pendingRequestsState === LoadingStates.loaded ||
      pendingRequestsState === LoadingStates.error
    )
      return;
    if (profileLoadingState !== LoadingStates.loaded) return;

    dispatch(loadPendingFriendRequests());
  }, [dispatch, pendingRequestsState, profileLoadingState, user]);

  // const [friends, setFriends] = useState<FriendList[]>();

  // useEffect(() => {
  //   const getFriends = async () => {
  //     const { data: friendList, error: friendListError } =
  //       await supabaseClient.rpc("get_friend_list");

  //     if (friendListError || !friendList) return;

  //     const { data: friends, error: friendsError } = await supabaseClient
  //       .from("user_profiles")
  //       .select("*")
  //       .in("id", friendList);

  //     if (friendsError || !friends) return;

  //     setFriends(friends);
  //   };

  //   user && profile_hash && getFriends();
  // }, [user, profile_hash]);

  if (!pendingRequests || pendingRequests.length < 1)
    return (
      <Center mt={["8", "14"]}>
        <Text color="gray.600">{t("friendList.noFriends")}</Text>
      </Center>
    );

  return (
    <>
      <Text textAlign="end" color="gray.600" fontSize="sm" mb="2">
        {t("friendList.count", { count: friends?.length || 0 })}
      </Text>
      <Flex direction="column" gap="3">
        {pendingRequests.map((friend) => (
          <Friend
            key={friend.profile_hash}
            name={friend.user_name || ""}
            url={friend.profile_hash}
            avatar_url={friend.avatar_url || ""}
            isPending={true}
          />
        ))}
      </Flex>
    </>
  );
}
