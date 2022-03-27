import { Container, Heading, Link, useBreakpointValue } from "@chakra-ui/react";
import { MinimalHeader } from "components";
import { ArrowLeft } from "components/Icons";
import SignUp from "components/templates/SignUp";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";

export default function SignUpPage() {
  const { t } = useTranslation(["signup"]);
  const smallScreen = useBreakpointValue({ base: true, sm: false });

  return (
    <>
      <MinimalHeader />
      <Container as="main" maxW="96" layerStyle="pageContainer">
        <NextLink href="/" passHref>
          <Link
            display="block"
            mr="auto"
            color="blue.500"
            fontSize={["sm", "md"]}
          >
            <ArrowLeft boxSize={["3", "4"]} mb={["0.5", "1"]} /> {t("return")}
          </Link>
        </NextLink>
        {!smallScreen && (
          <Heading as="h2" size="sm" mt="3" mb="2">
            Friend Tracker
          </Heading>
        )}
        <SignUp />
      </Container>
    </>
  );
}
