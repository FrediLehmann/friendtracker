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
} from "@chakra-ui/react";
import { Copyright, LanguageSelect, SetStatus } from "components";
import {
  Menu as MenuIcon,
  Settings,
  Github,
  CreditCard,
  Users,
  MessageSquare,
} from "components/Icons";
import { useTranslation } from "next-i18next";
import NavItem from "./NavItem";
import NextLink from "next/link";

const FullHeader = () => {
  const { t } = useTranslation("common");
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <LanguageSelect />
          <IconButton
            ml="4"
            aria-label={t("menu")}
            variant="outline"
            icon={<MenuIcon />}
            onClick={onOpen}
          />
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

export default FullHeader;
