import { Button } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Facebook } from "components/Icons";
import { useTranslation } from "next-i18next";

export default function SignInFacebook() {
  const { t } = useTranslation(["login"]);

  const signIn = async () => {
    const { user, error } = await supabaseClient.auth.signIn({
      provider: "twitter",
    });
  };

  return (
    <Button
      w="100%"
      size="sm"
      colorScheme="facebook"
      leftIcon={<Facebook boxSize="4" fill="white" />}
      onClick={signIn}
    >
      {t("loginWithFacebook")}
    </Button>
  );
}
