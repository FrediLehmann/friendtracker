import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Copyright } from "components";
import {
  Activity,
  CreditCard,
  Github,
  Logout,
  Menu as MenuIcon,
  MessageSquare,
  Settings,
  Users,
} from "icons";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getUserLoggedIn } from "store/user";
import NavItem from "./NavItem";

export default function Menu() {
  const { t } = useTranslation("common");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loggedIn = useSelector(getUserLoggedIn);
  const router = useRouter();

  return (
    <>
      {loggedIn && (
        <IconButton
          ml="4"
          aria-label={t("menu")}
          variant="outline"
          icon={<MenuIcon />}
          onClick={onOpen}
        />
      )}
      <Drawer onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody px="0" display="flex" flexDirection="column">
            <DrawerCloseButton mt="3" />
            <Flex direction="column" w="full">
              <Heading as="p" mt="8" mb="4" pl="6" fontSize="sm">
                {t("header.navigation.pages.title")}
              </Heading>
              <NavItem
                href="/newsfeed"
                icon={<Activity boxSize="5" />}
                text={t("header.navigation.pages.newsfeed")}
              />
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
                  router.push("/");
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
    </>
  );
}
