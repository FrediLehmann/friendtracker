import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
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
import { addPhoneNumber } from "store/user";

export default function AddPhone() {
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
        {t("phoneSection.addPhone.add")}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("phoneSection.addPhone.label")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="4">
            <Formik
              initialValues={{ number: "" }}
              validationSchema={object({
                number: string().required(t("phoneSection.addPhone.required")),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                await dispatch(addPhoneNumber(values.number));
                setSubmitting(false);
                onClose();
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormField
                    name="number"
                    label={t("phoneSection.addPhone.label")}
                  />
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
