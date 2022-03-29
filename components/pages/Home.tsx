import {
  Center,
  Container,
  Flex,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  Card,
  Copyright,
  Description,
  ExternalSignIn,
  MinimalHeader,
  SignInForm,
  Unregistered,
} from "components";
import { useTranslation } from "next-i18next";

export default function Home() {
  const { t } = useTranslation(["login"]);
  const smallScreen = useBreakpointValue({ base: true, sm: false });

  return (
    <>
      <MinimalHeader />
      <Container as="main" maxW="96" layerStyle="pageContainer">
        <Center flexDirection="column">
          {!smallScreen && (
            <Heading as="h1" size="lg" mb={["3", "8"]} alignSelf="start">
              Friend Tracker
            </Heading>
          )}
          <Description mb={["4", "6"]}>{t("loginText")}</Description>
          <Flex flexDirection="column" gap={["3", "5"]}>
            <Card bg="gray.50">
              <SignInForm />
            </Card>
            <Card bg="gray.50">
              <ExternalSignIn />
            </Card>
            <Card fontSize="sm">
              <Unregistered />
            </Card>
          </Flex>
          <Copyright />
        </Center>
      </Container>
    </>
  );
}
