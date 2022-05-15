import { Avatar as ChakraAvatar } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { useEffect, useState } from "react";

export default function Avatar({
  url = "",
  children,
  ...rest
}: {
  url?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const { user } = useUser();

  useEffect(() => {
    const fetchSignedAvatarUrl = async () => {
      let { publicURL, error } = await supabaseClient.storage
        .from("avatars")
        .getPublicUrl(url);

      if (error) throw error;

      setAvatarUrl(publicURL || "");
    };

    if (user && url) fetchSignedAvatarUrl();
  }, [avatarUrl, user, url]);

  return (
    <ChakraAvatar {...rest} src={avatarUrl}>
      {children}
    </ChakraAvatar>
  );
}
