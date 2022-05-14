import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { PageFrame } from "components";
import { ArrowLeft } from "icons";
import { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ContactElement } from "./components";
import { useEffect, useState } from "react";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { definitions } from "types/supabase";

const Friend: NextPage = () => {
  const { t } = useTranslation(["friends", "common"]);
  const avatarSize = useBreakpointValue({ base: "md", md: "lg" });

  const { user } = useUser();

  const router = useRouter();
  const { identifier } = router.query;

  const [friend, setFriend] = useState<definitions["profiles"]>();
  useEffect(() => {
    const fetchFriend = async () => {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("profile_hash", identifier)
        .single();

      if (error) throw error;

      setFriend(data);
    };

    user && fetchFriend();
  }, [user, identifier]);

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();
  useEffect(() => {
    const fetchSignedAvatarUrl = async () => {
      if (!friend?.avatar_url) return;

      let { publicURL, error } = await supabaseClient.storage
        .from("avatars")
        .getPublicUrl(friend.avatar_url);

      if (error) throw error;

      setAvatarUrl(publicURL || "");
    };

    if (user && friend) fetchSignedAvatarUrl();
  }, [friend, user]);

  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <PageFrame>
        <Box layerStyle="pageContent">
          <Flex gap="5" alignItems="center">
            <Avatar src={avatarUrl} size={avatarSize} />
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
            <Button variant="outline" colorScheme="red" size="sm">
              {t("friendList.removeFriend")}
            </Button>
          </Flex>
        </Box>
      </PageFrame>
    </>
  );
};

export default Friend;
