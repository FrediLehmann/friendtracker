import {
  Avatar,
  useBreakpointValue,
  IconButton,
  Tooltip,
  VisuallyHiddenInput,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { Camera } from "icons";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, uploadAvatarImage } from "store/user";

export default function AvatarUpload() {
  const { t } = useTranslation("profile");

  const smallSize = useBreakpointValue({ base: true, sm: false });
  const toast = useToast();

  const { user } = useUser();

  const dispatch = useDispatch();

  const {
    owner = "",
    user_name = "",
    avatar_url = "",
    uploadingAvatarImage,
  } = useSelector(getUserProfile);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();

  useEffect(() => {
    const fetchSignedAvatarUrl = async () => {
      let { signedURL, error } = await supabaseClient.storage
        .from("avatars")
        .createSignedUrl(avatar_url, 60);

      if (error) throw error;

      setAvatarUrl(signedURL || "");
    };

    if (uploadingAvatarImage && avatarUrl) setAvatarUrl(undefined);

    if (user && !uploadingAvatarImage && avatar_url) fetchSignedAvatarUrl();
  }, [avatarUrl, avatar_url, uploadingAvatarImage, user]);

  function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      toast({
        title: "Select a file",
        description: "Please select a file to upload",
        status: "error",
      });
      return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${owner}/${user_name.replace(" ", "")}.${fileExt}`;

    dispatch(uploadAvatarImage({ filePath, file }));
  }

  return (
    <>
      <Avatar
        display="block"
        name={user_name}
        size={smallSize ? "lg" : "xl"}
        src={avatarUrl}
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
