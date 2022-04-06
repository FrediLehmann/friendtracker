import {
  Avatar,
  useBreakpointValue,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { Camera } from "icons";
import { useTranslation } from "next-i18next";

export default function AvatarUpload() {
  const { t } = useTranslation("profile");
  const smallSize = useBreakpointValue({ base: true, sm: false });
  return (
    <>
      <Avatar display="block" size={smallSize ? "lg" : "xl"} />
      <Tooltip label={t("avatarSection.imgAriaLabel")}>
        <IconButton
          alignSelf="end"
          ml={["-1.25rem", "-1.5rem", "-2rem"]}
          mb={["-0.75rem"]}
          aria-label={t("avatarSection.imgAriaLabel")}
          icon={<Camera boxSize={smallSize ? "4" : "5"} />}
          borderRadius="full"
          size={smallSize ? "sm" : "md"}
        />
      </Tooltip>
    </>
  );
}
