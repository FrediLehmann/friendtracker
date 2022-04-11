import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Plus } from "icons";
import { useTranslation } from "next-i18next";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import { FormField } from "components";
import { useDispatch } from "react-redux";
import { addEmailAddress } from "store/user";

export default function AddEmail() {
  const { t } = useTranslation(["profile"]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  return (
    <Box ml="4">
      <Button
        variant="outline"
        onClick={onOpen}
        size="sm"
        rightIcon={<Plus boxSize="5" />}
      >
        {t("emailSection.addEmail.add")}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("emailSection.addEmail.title")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="4">
            <Formik
              initialValues={{ email: "" }}
              validationSchema={object({
                email: string()
                  .email(t("emailSection.addEmail.invalid"))
                  .required(t("emailSection.addEmail.required")),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                await dispatch(addEmailAddress(values.email));
                setSubmitting(false);
                onClose();
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormField
                    name="email"
                    label={t("emailSection.addEmail.label")}
                  />
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
