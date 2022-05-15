import {
  useBreakpointValue,
  IconButton,
  Tooltip,
  VisuallyHiddenInput,
  useToast,
} from "@chakra-ui/react";
import { Avatar } from "components";
import { Camera } from "icons";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, uploadAvatarImage } from "store/user";

export default function AvatarUpload() {
  const { t } = useTranslation("profile");

  const smallSize = useBreakpointValue({ base: true, sm: false });
  const toast = useToast();

  const dispatch = useDispatch();

  const {
    owner = "",
    user_name = "",
    avatar_url = "",
    uploadingAvatarImage,
  } = useSelector(getUserProfile);

  function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      toast({
        title: t("avatarSection.selectFile"),
        description: t("avatarSection.selectFileDescription"),
        status: "error",
      });
      return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${owner}/avatar.${fileExt}`;

    dispatch(uploadAvatarImage({ filePath, file }));
  }

  return (
    <>
      <Avatar
        display="block"
        name={user_name}
        size={smallSize ? "lg" : "xl"}
        url={avatar_url}
      />
      <Tooltip label={t("avatarSection.imgAriaLabel")}>
        <IconButton
          alignSelf="end"
          ml={["-1.25rem", "-1.5rem", "-2rem"]}
          mb={["-0.75rem"]}
          aria-label={t("avatarSection.imgAriaLabel")}
          icon={<Camera boxSize={smallSize ? "4" : "5"} />}
          borderRadius="full"
          size={smallSize ? "sm" : "md"}
          isLoading={uploadingAvatarImage}
          onClick={() =>
            (
              global.document.querySelector("#avatar") as HTMLInputElement
            ).click()
          }
        />
      </Tooltip>
      <VisuallyHiddenInput
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        onChange={uploadAvatar}
      />
    </>
  );
}
