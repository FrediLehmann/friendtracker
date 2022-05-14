import { Center, Flex, Text } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "store/user";
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

  const { profile_hash } = useSelector(getUserProfile);

  const [friends, setFriends] = useState<FriendList[]>();

  useEffect(() => {
    const getFriends = async () => {
      const { data: data_f1, error: error_f1 } = await supabaseClient
        .from("profiles")
        .select(
          "owner, user_name, avatar_url, profile_hash, friends!friends_initiator_fkey!inner(request_status, friend)"
        )
        .neq("friends.initiator", profile_hash);

      if (error_f1) throw error_f1;

      const { data: data_f2, error: error_f2 } = await supabaseClient
        .from("profiles")
        .select(
          "owner, user_name, avatar_url, profile_hash, friends!friends_friend_fkey!inner(request_status, friend)"
        )
        .neq("friends.friend", profile_hash);

      if (error_f2) throw error_f2;

      setFriends([...data_f1, ...data_f2]);
    };

    user && profile_hash && getFriends();
  }, [user, profile_hash]);

  return friends && friends.length > 0 ? (
    <>
      <Text textAlign="end" color="gray.500" fontSize="sm" mb="2">
        {t("friendList.count", { count: friends?.length || 0 })}
      </Text>
      <Flex direction="column" gap="3">
        {friends.map((friend) => (
          <Friend
            key={friend.profile_hash}
            name={friend.user_name || ""}
            url={friend.profile_hash}
            isPending={friend.friends[0]?.request_status === "pending"}
          />
        ))}
      </Flex>
    </>
  ) : (
    <Center mt={["8", "14"]}>
      <Text color="gray.500">{t("friendList.noFriends")}</Text>
    </Center>
  );
}
