import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { Avatar, PageFrame } from "components";
import { ArrowLeft } from "icons";
import { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriendByHash,
  getFriendsLoadingState,
  loadFriends,
} from "store/friends";
import { LoadingStates } from "types/DataStates.enum";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";

const Friend: NextPage = () => {
  const { t } = useTranslation(["friends", "common"]);
  const avatarSize = useBreakpointValue({ base: "md", md: "lg" });

  const { user } = useUser();

  const router = useRouter();
  const { identifier = "" } = router.query;

  const dispatch = useDispatch();
  const friend = useSelector(
    getFriendByHash(typeof identifier === "string" ? identifier : identifier[0])
  );

  const friendsLoadedState = useSelector(getFriendsLoadingState);
  useEffect(() => {
    if (friendsLoadedState !== LoadingStates.unloaded) return;

    user && dispatch(loadFriends());
  }, [dispatch, friendsLoadedState, user]);

  const removeFriend = async () => {
    if (!friend) return;

    await supabaseClient.rpc("remove_friend", { friend: friend.id });
    dispatch(loadFriends());
    router.push("/friends");
  };

  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <PageFrame>
        <Box layerStyle="pageContent">
          <Flex gap="5" alignItems="center">
            <Avatar url={friend?.avatar_url} size={avatarSize} />
            <VStack spacing="2" align="start">
              <Heading as="h1" size="lg">
                {friend?.user_name || ""}
              </Heading>
            </VStack>
          </Flex>
          <Divider my="4" />
          <Flex
            layerStyle="card"
            mt="4"
            bg="white"
            align="center"
            justify="space-between"
          >
            <NextLink href="/friends" passHref>
              <Link display="block" color="blue.500">
                <ArrowLeft boxSize="4" mb="1" /> {t("backToFriends")}
              </Link>
            </NextLink>
            <Button
              variant="outline"
              colorScheme="red"
              size="sm"
              onClick={removeFriend}
            >
              {t("friendList.removeFriend")}
            </Button>
          </Flex>
        </Box>
      </PageFrame>
    </>
  );
};

export default Friend;
