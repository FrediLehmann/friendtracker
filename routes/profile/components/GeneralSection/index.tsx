import { Flex, VStack } from "@chakra-ui/react";
import { DescriptionText, FormField } from "components";
import { Form, Formik } from "formik";
import { useTranslation } from "next-i18next";
import { object, string } from "yup";
import { SectionWrapper } from "..";
import { AvatarUpload } from "./components";

export default function GeneralSection() {
  const { t } = useTranslation(["profile", "common"]);

  return (
    <SectionWrapper mb={["8", "12"]} mt={["6", "10"]}>
      <Flex gap={["6", "12"]} flexDirection={["column", "row"]}>
        <AvatarUpload />
        <Formik
          initialValues={{ firstname: "", lastname: "" }}
          validationSchema={object({
            firstname: string().required(t("nameSection.firstName.required")),
            lastname: string().required(t("nameSection.lastName.required")),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 3000);
          }}
        >
          <Form>
            <VStack spacing={["3", "6"]}>
              <FormField
                name="firstname"
                label={t("nameSection.firstName.label")}
              />
              <FormField
                name="lastname"
                label={t("nameSection.lastName.label")}
              />
              <DescriptionText>{t("nameSection.description")}</DescriptionText>
            </VStack>
          </Form>
        </Formik>
      </Flex>
    </SectionWrapper>
  );
}
