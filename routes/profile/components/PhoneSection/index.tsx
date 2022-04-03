import { Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { SectionHeading, SectionWrapper } from "..";
import { PhoneInfo } from "./components";

export default function PhoneSection() {
  const { t } = useTranslation(["profile", "common"]);

  return (
    <SectionWrapper>
      <SectionHeading>{t("phoneSection.title")}</SectionHeading>
      <Text color="gray.500" fontSize={["sm", null, "md"]}>
        {t("phoneSection.description")}
      </Text>
      <PhoneInfo number="+41 (0) 79 475 78 91" />
      {/* <Formik
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
            <FormField name="number" label={t("phoneSection.addPhone.label")} />
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
      </Formik> */}
    </SectionWrapper>
  );
}
