import { Form as FormikForm, Formik } from "formik";
import * as yup from "yup";
import { useTranslation } from "next-i18next";
import { useToast, VStack, Button } from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { EmailSection, PasswordSection, ToSSection } from "./components";

export default function Form({
  setRegistered,
}: {
  setRegistered: (arg0: boolean) => void;
}) {
  const { t } = useTranslation(["signup"]);
  const toast = useToast();

  return (
    <Formik
      initialValues={{
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        tosAgreement: false,
      }}
      validationSchema={yup.object({
        email: yup
          .string()
          .email(t("signupForm.email.invalid"))
          .required(t("signupForm.email.required")),
        confirmEmail: yup
          .string()
          .email(t("signupForm.email.invalid"))
          .required(t("signupForm.email.required"))
          .oneOf([yup.ref("email"), null], t("signupForm.emailVerify.match")),
        password: yup
          .string()
          .required(t("signupForm.password.required"))
          .min(8, t("signupForm.password.minLength")),
        confirmPassword: yup
          .string()
          .required()
          .oneOf(
            [yup.ref("password"), null],
            t("signupForm.passwordVerify.match")
          ),
        tosAgreement: yup.bool().isTrue(t("signupForm.tos.needsToBeChecked")),
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
        <FormikForm>
          <VStack spacing="5">
            <EmailSection />
            <PasswordSection />
            <ToSSection />
            <Button
              colorScheme="blue"
              w="full"
              mt="4"
              type="submit"
              isLoading={isSubmitting}
            >
              {t("signupForm.submit")}
            </Button>
          </VStack>
        </FormikForm>
      )}
    </Formik>
  );
}
