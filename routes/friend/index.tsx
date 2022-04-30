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

const Friend: NextPage = () => {
  const { t } = useTranslation(["friends", "common"]);
  const avatarSize = useBreakpointValue({ base: "lg", md: "xl" });

  const router = useRouter();
  const { identifier } = router.query;

  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <PageFrame>
        <Box layerStyle="pageContent">
          <Flex gap="5" alignItems="center">
            <Avatar size={avatarSize} />
            <VStack spacing="2" align="start">
              <Heading as="h1" size="lg">
                {identifier}
              </Heading>
              <Stack direction={["column", "row"]} spacing="2">
                <Badge
                  colorScheme="green"
                  fontSize={["0.6rem", null, "0.75rem"]}
                >
                  {t("safetyStatus.ok")}
                </Badge>
                <Badge
                  colorScheme="green"
                  fontSize={["0.6rem", null, "0.75rem"]}
                >
                  {t("healtStatus.good")}
                </Badge>
              </Stack>
              <Text fontSize={["xs", null, "md"]}>
                {t("friendList.lastOnline", { lastLogin: "24.03.2022" })}
              </Text>
            </VStack>
          </Flex>
          <Divider my="4" />
          <NextLink href="/friends" passHref>
            <Link display="block" mb="5" color="blue.500">
              <ArrowLeft boxSize="4" mb="1" /> {t("backToFriends")}
            </Link>
          </NextLink>
          <Flex layerStyle="card" gap="4" bg="white" flexDirection="column">
            <Heading as="h2" size="sm" color="gray.700">
              {t("contactDetails")}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              {t("contactText", { name: "Hannes" })}
            </Text>
            <ContactElement type="phone" text="+41 79 475 78 91" />
            <ContactElement type="email" text="frederic.lehmann@bluewin.ch" />
          </Flex>
          <Flex layerStyle="card" mt="4" bg="white">
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
