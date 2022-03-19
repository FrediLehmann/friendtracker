import { Button, Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";

export default function SetStatus({ size }: { size: "sm" | "md" }) {
  const { t } = useTranslation("common");
  return (
    <Formik
      initialValues={{ safety: "safe", health: "good" }}
      validationSchema={Yup.object({
        safety: Yup.mixed().oneOf(["safe", "unsafe"]).defined(),
        health: Yup.mixed().oneOf(["good", "ok", "bad"]).defined(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
        }, 3000);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex gap="4">
            <Field name="safety">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.safety && !!form.touched.safety}
                >
                  <FormLabel htmlFor="safety" fontSize={size}>
                    {t("status.safety.title")}
                  </FormLabel>
                  <Select {...field} id="safety">
                    <option value="safe">{t("status.safety.safe")}</option>
                    <option value="unsafe">{t("status.safety.unsafe")}</option>
                  </Select>
                </FormControl>
              )}
            </Field>
            <Field name="health">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.health && !!form.touched.health}
                >
                  <FormLabel htmlFor="health" fontSize={size}>
                    {t("status.health.title")}
                  </FormLabel>
                  <Select {...field} id="health">
                    <option value="good">{t("status.health.good")}</option>
                    <option value="ok">{t("status.health.ok")}</option>
                    <option value="bad">{t("status.health.bad")}</option>
                  </Select>
                </FormControl>
              )}
            </Field>
          </Flex>
          <Button colorScheme="blue" size={size} mt="3">
            {t("status.safe")}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
