import {
  Center,
  Container,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Copyright, Description, MinimalHeader, SignIn } from "components";
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
          <SignIn />
          <Copyright />
        </Center>
      </Container>
    </>
  );
}
