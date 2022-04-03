import { Form, Formik } from "formik";
import { object, string, bool } from "yup";
import { useTranslation } from "next-i18next";
import { useToast, VStack, Text, Link, Button } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { CheckBoxField, FormField } from "components";
import NextLink from "next/link";

export default function F({
  setRegistered,
}: {
  setRegistered: (arg0: boolean) => void;
}) {
  const { t } = useTranslation(["signup"]);
  const toast = useToast();

  return (
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
          <VStack spacing="5">
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
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
