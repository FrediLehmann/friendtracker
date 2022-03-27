import { Button } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Twitter } from "components/Icons";
import { useTranslation } from "next-i18next";

export default function SignInTwitter() {
  const { t } = useTranslation(["login"]);

  const signIn = async () => {
    const { user, error } = await supabaseClient.auth.signIn({
      provider: "twitter",
    });
  };

  return (
    <Button
      mt="3"
      size="sm"
      w="100%"
      colorScheme="twitter"
      leftIcon={<Twitter boxSize="4" fill="white" />}
      onClick={signIn}
    >
      {t("loginWithTwitter")}
    </Button>
  );
}
