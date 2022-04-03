import { useTranslation } from "next-i18next";
import { SectionHeading, SectionWrapper } from "..";
import { EmailInfo } from "./components";

export default function EmailSection() {
  const { t } = useTranslation(["profile", "common"]);

  return (
    <SectionWrapper mb={["8", "12"]}>
      <SectionHeading>{t("emailSection.title")}</SectionHeading>
      <EmailInfo
        email="viacheslav.lushchinskiy@swissmarketplace.group"
        isPrimary
      />
      <EmailInfo email="vl@email.me" />
      {/* <Formik
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
            <FormField name="email" label={t("emailSection.addEmail.label")} />
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
      </Formik> */}
    </SectionWrapper>
  );
}
