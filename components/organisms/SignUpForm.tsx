import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Fade,
  Flex,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { FormField } from "components/molecules";
import CheckBoxField from "components/molecules/CheckBoxField";
import { Form, Formik } from "formik";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { object, string, bool } from "yup";
import NextLink from "next/link";
import { Login } from "components/Icons";

export default function SignUpForm() {
  const [registered, setRegistered] = useState(false);
  const { t } = useTranslation(["signup"]);
  const toast = useToast();

  return registered ? (
    <Fade in={registered}>
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
  ) : (
    <Formik
      initialValues={{ email: "", password: "", tosAgreement: false }}
      validationSchema={object({
        email: string()
          .email(t("signupForm.email.invalid"))
          .required(t("signupForm.email.required")),
        password: string()
          .required(t("signupForm.password.required"))
          .min(8, t("signupForm.password.minLength")),
        tosAgreement: bool().isTrue(t("signupForm.tos.needsToBeChecked")),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const { error } = await supabaseClient.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (error) {
          toast({
            title: t("signupForm.submitFailed"),
            position: "top",
            status: "error",
          });
        } else {
          setRegistered(true);
        }

        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex flexDirection="column" gap="5">
            <FormField
              name="email"
              label={t("signupForm.email.label")}
              isRequired
              helperText={t("signupForm.email.helper")}
              helperPosition="before"
            />
            <FormField
              name="password"
              type="password"
              label={t("signupForm.password.label")}
              isRequired
            />
            <CheckBoxField
              name="tosAgreement"
              label={t("signupForm.tos.label")}
            >
              <Text fontSize={["sm", "md"]}>
                {t("signupForm.tos.checkbox.agree")}{" "}
                <NextLink href="/tos" passHref>
                  <Link color="blue.500">
                    {t("signupForm.tos.checkbox.link")}
                  </Link>
                </NextLink>{" "}
                {t("signupForm.tos.checkbox.signup")}
              </Text>
            </CheckBoxField>
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
  );
}
