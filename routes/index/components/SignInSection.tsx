import { Box, Button, useToast } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { FormField } from "components";
import { Form, Formik } from "formik";
import { useTranslation } from "next-i18next";
import { object, string } from "yup";

export default function SignInSection() {
  const { t } = useTranslation(["login"]);
  const toast = useToast();

  return (
    <Box
      as="section"
      w="full"
      px={["3", "5"]}
      py={["3", "4"]}
      bg="gray.50"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.200"
    >
      <Formik
        initialValues={{ email: "" }}
        validationSchema={object({
          email: string()
            .email(t("loginForm.email.invalid"))
            .required(t("loginForm.email.required")),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const { error } = await supabaseClient.auth.signIn({
            email: values.email,
          });

          if (error) {
            toast({
              title: t("loginForm.login.failed"),
              position: "top",
              status: "error",
            });
          } else {
            toast({
              title: t("loginForm.login.success"),
              position: "top",
              status: "success",
            });
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormField
              name="email"
              label={t("loginForm.email.label")}
              isRequired
              backgroundColor="white"
            />
            <Button
              mt="5"
              w="100%"
              size="md"
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
  );
}
