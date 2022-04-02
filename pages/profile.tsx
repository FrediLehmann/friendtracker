import {
  Box,
  Flex,
  Heading,
  Text,
  FormLabel,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  VStack,
} from "@chakra-ui/react";
import {
  AvatarUpload,
  EmailInfo,
  PageFrame,
  PhoneInfo,
  SetStatus,
} from "components";
import { Field, FieldProps, Form, Formik } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import { object, string } from "yup";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { withAuthRequired } from "@supabase/supabase-auth-helpers/nextjs";

export const getServerSideProps = withAuthRequired({
  async getServerSideProps({ locale = "en" }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common", "profile"])),
      },
    };
  },
});

const Profile: NextPage = () => {
  const { t } = useTranslation(["profile", "common"]);
  return (
    <>
      <Head>
        <title>Friend Tracker | {t("page.title")}</title>
      </Head>
      <PageFrame>
        <Flex layerStyle="pageContent" flexDirection="column" gap="3" w="full">
          <Box bg="white" layerStyle="card">
            <Heading as="h2" fontSize={["md", "lg"]} mb="4">
              {t("status")}
            </Heading>
            <SetStatus size="md" />
          </Box>
          <VStack align="stretch" spacing="4" bg="white" layerStyle="card">
            <Heading as="h2" fontSize={["md", "lg"]}>
              {t("profileSection.title")}
            </Heading>
            <Flex gap="5" flexDirection={["column", "row"]}>
              <AvatarUpload />
              <Box>
                <Formik
                  initialValues={{ firstname: "", lastname: "" }}
                  validationSchema={object({
                    firstname: string().required(
                      t("nameSection.firstName.required")
                    ),
                    lastname: string().required(
                      t("nameSection.lastName.required")
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
                      <Flex flexDirection={["column", null, "row"]} gap="4">
                        <Field name="firstname">
                          {({ field, form }: FieldProps) => (
                            <FormControl
                              isInvalid={
                                !!form.errors.firstname &&
                                !!form.touched.firstname
                              }
                            >
                              <FormLabel htmlFor="firstname">
                                {t("nameSection.firstName.label")}
                              </FormLabel>
                              <Input {...field} id="firstname" />
                              <FormErrorMessage>
                                {form.errors.firstname}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="lastname">
                          {({ field, form }: FieldProps) => (
                            <FormControl
                              isInvalid={
                                !!form.errors.lastname &&
                                !!form.touched.lastname
                              }
                            >
                              <FormLabel>
                                {t("nameSection.lastName.label")}
                              </FormLabel>
                              <Input {...field} id="lastname" />
                              <FormErrorMessage>
                                {form.errors.lastname}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                    </Form>
                  )}
                </Formik>
                <Text
                  color="gray.500"
                  mt={["2", null, "4"]}
                  fontSize={["sm", null, "md"]}
                >
                  {t("nameSection.description")}
                </Text>
              </Box>
            </Flex>
          </VStack>
          <VStack align="stretch" spacing="4" bg="white" layerStyle="card">
            <Heading as="h2" fontSize={["md", "lg"]}>
              {t("emailSection.title")}
            </Heading>
            <EmailInfo
              email="viacheslav.lushchinskiy@swissmarketplace.group"
              isPrimary={true}
            />
            <Formik
              initialValues={{ email: "" }}
              validationSchema={object({
                email: string()
                  .email(t("emailSection.addEmail.invalid"))
                  .required(t("emailSection.addEmail.required")),
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
                        isInvalid={!!form.errors.email && !!form.touched.email}
                      >
                        <FormLabel htmlFor="email">
                          {t("emailSection.addEmail.label")}
                        </FormLabel>
                        <Input {...field} id="email" backgroundColor="white" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt="2"
                    w="100%"
                    size="sm"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    {t("emailSection.addEmail.add")}
                  </Button>
                </Form>
              )}
            </Formik>
          </VStack>
          <VStack align="stretch" spacing="4" bg="white" layerStyle="card">
            <Heading as="h2" fontSize={["md", "lg"]} mb="4">
              {t("phoneSection.title")}
            </Heading>
            <Text color="gray.500" fontSize={["sm", null, "md"]}>
              {t("phoneSection.description")}
            </Text>
            <PhoneInfo number="+41 (0) 79 475 78 91" />
            <Formik
              initialValues={{ number: "" }}
              validationSchema={object({
                number: string().required(t("phoneSection.addPhone.required")),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                }, 3000);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field name="number">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          !!form.errors.number && !!form.touched.number
                        }
                      >
                        <FormLabel htmlFor="number">
                          {t("phoneSection.addPhone.label")}
                        </FormLabel>
                        <Input {...field} id="number" backgroundColor="white" />
                        <FormErrorMessage>
                          {form.errors.number}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt="2"
                    w="100%"
                    size="sm"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    {t("phoneSection.addPhone.add")}
                  </Button>
                </Form>
              )}
            </Formik>
          </VStack>
        </Flex>
      </PageFrame>
    </>
  );
};

export default Profile;
