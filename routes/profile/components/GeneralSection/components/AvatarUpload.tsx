import {
  Avatar,
  Button,
  Center,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Camera } from "icons";
import { useTranslation } from "next-i18next";

export default function AvatarUpload() {
  const { t } = useTranslation("profile");
  const smallSize = useBreakpointValue({ base: true, sm: false });
  return (
    <Center>
      <Flex flexDirection="column" gap="3" alignItems="center">
        <Avatar display="block" size={smallSize ? "xl" : "2xl"} />
        <Button leftIcon={<Camera boxSize="5" />} size="sm">
          {t("avatarSection.imgAriaLabel")}
        </Button>
      </Flex>
    </Center>
  );
}
