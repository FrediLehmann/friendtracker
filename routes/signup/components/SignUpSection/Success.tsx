import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Fade,
  Link,
} from "@chakra-ui/react";
import { Login } from "components/Icons";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";

export default function Success() {
  const { t } = useTranslation(["signup"]);

  return (
    <Fade in={true}>
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        py="6"
        borderRadius="sm"
      >
        <AlertIcon boxSize="35px" mr="0" />
        <AlertTitle my="2">{t("signupForm.success.title")}</AlertTitle>
        <AlertDescription maxW="sm" mb="3">
          {t("signupForm.success.description")}
        </AlertDescription>
        <NextLink href="/" passHref>
          <Link alignItems="center">
            <Login boxSize="5" mr="2" />
            {t("signupForm.success.toLogin")}
          </Link>
        </NextLink>
      </Alert>
    </Fade>
  );
}
