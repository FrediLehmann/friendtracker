import {
  Box,
  Container,
  Heading,
  IconButton,
  Drawer,
  useDisclosure,
  DrawerContent,
  DrawerBody,
  DrawerOverlay,
  DrawerCloseButton,
  Flex,
  Divider,
  Spacer,
  LinkBox,
  LinkOverlay,
  Button,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Copyright, LanguageSelect, SetStatus } from "components";
import {
  Menu as MenuIcon,
  Settings,
  Github,
  CreditCard,
  Users,
  MessageSquare,
  DollarSign,
  Logout,
} from "components/Icons";
import { useTranslation } from "next-i18next";
import NavItem from "./NavItem";
import NextLink from "next/link";
import useLoggedIn from "state/auth/useLoggedIn";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useRouter } from "next/router";

const Header = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonVariant = useBreakpointValue({
    base: "icon",
    md: "full",
  });
  const loggedIn = useLoggedIn();

  return (
    <Box as="header">
      <Container
        maxW="container.xl"
        py={["2", "4"]}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <LinkBox>
          <Heading as="h1" fontSize={["sm", "md", "lg"]}>
            <NextLink href="/friends" passHref>
              <LinkOverlay>Friend Tracker</LinkOverlay>
            </NextLink>
          </Heading>
        </LinkBox>
        <Flex>
          {!loggedIn && buttonVariant === "full" && (
            <Flex gap="2" mr="2">
              <Button leftIcon={<Github boxSize="4" />} variant="ghost">
                <Text>{t("header.contribute")}</Text>
              </Button>
              <Button
                leftIcon={<DollarSign boxSize="4" />}
                variant="ghost"
                onClick={() => router.push("/pricing")}
              >
                <Text>{t("header.pricing")}</Text>
              </Button>
            </Flex>
          )}
          {!loggedIn && buttonVariant === "icon" && (
            <Flex gap="1" mr="1">
              <IconButton
                variant="ghost"
                icon={<Github boxSize="4" />}
                aria-label={t("header.contribute")}
              />
              <IconButton
                variant="ghost"
                icon={<DollarSign boxSize="4" />}
                aria-label={t("header.pricing")}
                onClick={() => router.push("/pricing")}
              />
            </Flex>
          )}
          <LanguageSelect />
          {loggedIn && (
            <IconButton
              ml="4"
              aria-label={t("menu")}
              variant="outline"
              icon={<MenuIcon />}
              onClick={onOpen}
            />
          )}
        </Flex>
        <Drawer onClose={onClose} isOpen={isOpen} size="xs">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody p="0" display="flex" flexDirection="column">
              <DrawerCloseButton mt="3" />
              <Flex flexDirection="column" mt="4.5rem" w="full">
                <Divider />
                <Box mt="5" px="6">
                  <SetStatus size="sm" />
                </Box>
                <Heading as="p" mt="8" mb="4" pl="6" fontSize="sm">
                  {t("header.navigation.pages.title")}
                </Heading>
                <NavItem
                  href="/friends"
                  icon={<Users boxSize="5" />}
                  text={t("header.navigation.pages.friends")}
                />
                <NavItem
                  href="/profile"
                  icon={<Settings boxSize="5" />}
                  text={t("header.navigation.pages.settings")}
                />
                <NavItem
                  onClick={() => {
                    supabaseClient.auth.signOut();
                  }}
                  icon={<Logout boxSize="5" />}
                  text={t("header.signout")}
                />
                <Heading as="p" mt="8" mb="4" pl="6" fontSize="sm">
                  {t("header.navigation.support.title")}
                </Heading>
                <NavItem
                  href="/feedback"
                  icon={<MessageSquare boxSize="5" />}
                  text={t("header.navigation.support.feedback")}
                />
                <NavItem
                  href="/profile"
                  icon={<Github boxSize="5" />}
                  text={t("header.navigation.support.contribute")}
                />
                <NavItem
                  href="/profile"
                  icon={<CreditCard boxSize="5" />}
                  text={t("header.navigation.support.donate")}
                />
              </Flex>
              <Spacer />
              <Copyright />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Container>
    </Box>
  );
};

export default Header;
