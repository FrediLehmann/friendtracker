import { Avatar, Button, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Camera } from "components/Icons";
import { useTranslation } from "next-i18next";

export default function AvatarUpload() {
  const { t } = useTranslation("profile");
  const smallSize = useBreakpointValue({ base: true, sm: false });
  return (
    <Flex flexDirection="column" gap="3" alignItems="center">
      <Avatar display="block" size={smallSize ? "lg" : "xl"} />
      <Button leftIcon={<Camera boxSize="5" />} size="sm">
        {t("avatarSection.imgAriaLabel")}
      </Button>
    </Flex>
  );
}
