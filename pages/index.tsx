import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import * as Yup from "yup";
import { Facebook, Twitter } from "components/Icons";
import NextLink from "next/link";
import { Copyright, MinimalHeader } from "components";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import withIsSignedIn from "utils/user/withSignInState";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "login"])),
    },
  };
}

const Home: NextPage = () => {
  const { t } = useTranslation(["login", "common"]);
  const smallScreen = useBreakpointValue({ base: true, sm: false });
  return (
    <>
      <Head>
        <title>Friend Tracker</title>
        <meta name="description" content={t("description")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MinimalHeader />
      <Container as="main" maxW="96" layerStyle="pageContainer">
        <Center>
          <Box>
            {!smallScreen && (
              <Heading as="h1" size="lg" mb={["3", "8"]}>
                Friend Tracker
              </Heading>
            )}
            <Text textStyle="descriptiveText" mb={["4", "6"]}>
              {t("loginText")}
            </Text>
            <Flex flexDirection="column" gap={["3", "5"]}>
              <Box layerStyle="card" bg="gray.50">
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .email(t("loginForm.email.invalid"))
                      .required(t("loginForm.email.required")),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      setSubmitting(false);
                    }, 3000);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Field name="email">
                        {({ field, form }: FieldProps) => (
                          <FormControl
                            isInvalid={
                              !!form.errors.email && !!form.touched.email
                            }
                            isRequired
                          >
                            <FormLabel htmlFor="email">
                              {t("loginForm.email.label")}
                            </FormLabel>
                            <Input
                              {...field}
                              id="email"
                              backgroundColor="white"
                            />
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Button
                        mt="5"
                        w="100%"
                        size="sm"
                        type="submit"
                        colorScheme="blue"
                        isLoading={isSubmitting}
                      >
                        {t("loginForm.submit")}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
              <Box layerStyle="card" bg="gray.50">
                <Button
                  w="100%"
                  size="sm"
                  colorScheme="facebook"
                  leftIcon={<Facebook boxSize="4" fill="white" />}
                >
                  {t("loginWithFacebook")}
                </Button>
                <Button
                  mt="3"
                  size="sm"
                  w="100%"
                  colorScheme="twitter"
                  leftIcon={<Twitter boxSize="4" fill="white" />}
                >
                  {t("loginWithTwitter")}
                </Button>
              </Box>
              <Box layerStyle="card" fontSize="sm">
                <Text fontSize={["sm", "md"]}>
                  {t("notRegistered")}{" "}
                  <NextLink href="/signup" passHref>
                    <Link color="blue.500">{t("createAccount")}</Link>
                  </NextLink>
                </Text>
              </Box>
            </Flex>
            <Copyright />
          </Box>
        </Center>
      </Container>
    </>
  );
};

export default withIsSignedIn(Home, {
  needsSignIn: false,
  redirectTo: "/friends",
});
