import {
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ArrowLeft } from "components/Icons";
import { Field, FieldProps, Form, Formik } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import * as Yup from "yup";
import NextLink from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { MinimalHeader } from "components";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "signup"])),
    },
  };
}

const Signup: NextPage = () => {
  const { t } = useTranslation(["signup", "common"]);
  const smallScreen = useBreakpointValue({ base: true, sm: false });
  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
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
        <Heading as="h1" size="lg" mt={smallScreen ? "1" : ""} mb={["4", "8"]}>
          {t("signup")}
        </Heading>
        <Text mb={["4", "6"]} color="gray.500" fontSize={["sm", "md"]}>
          {t("signupDescription")}
        </Text>
        <Formik
          initialValues={{ email: "", tosAgreement: false }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email(t("signupForm.email.invalid"))
              .required(t("signupForm.email.required")),
            tosAgreement: Yup.bool().isTrue(
              t("signupForm.tos.needsToBeChecked")
            ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 3000);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Flex flexDirection="column" gap="5">
                <Field name="email">
                  {({ field, form }: FieldProps) => (
                    <FormControl
                      isInvalid={!!form.errors.email && !!form.touched.email}
                      isRequired
                    >
                      <FormLabel htmlFor="email">
                        {t("signupForm.email.label")}
                      </FormLabel>
                      <Input {...field} id="email" />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      <FormHelperText fontSize={["sm", "md"]}>
                        {t("signupForm.email.helper")}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
                <Field name="tosAgreement">
                  {({ field, form }: FieldProps) => (
                    <FormControl
                      isInvalid={
                        !!form.errors.tosAgreement &&
                        !!form.touched.tosAgreement
                      }
                    >
                      <FormLabel htmlFor="tosAgreement" hidden>
                        {t("signupForm.tos.label")}
                      </FormLabel>
                      <Checkbox {...field}>
                        <Text fontSize={["sm", "md"]}>
                          {t("signupForm.tos.checkbox.agree")}{" "}
                          <NextLink href="/tos" passHref>
                            <Link color="blue.500">
                              {t("signupForm.tos.checkbox.link")}
                            </Link>
                          </NextLink>{" "}
                          {t("signupForm.tos.checkbox.signup")}
                        </Text>
                      </Checkbox>
                      <FormErrorMessage>
                        {form.errors.tosAgreement}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  colorScheme="blue"
                  mt="4"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  {t("signupForm.submit")}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Signup;
