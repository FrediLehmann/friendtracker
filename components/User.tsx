import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { Form, Formik } from "formik";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, getUserProfile, setUserName } from "store/user";
import DescriptionText from "./DescriptionText";
import { FormField } from "./Form";
import { object, string } from "yup";

export default function User({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation("common");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useUser();

  const dispatch = useDispatch();
  const { state, user_id, user_name } = useSelector(getUserProfile);

  useEffect(() => {
    if (user && state === "init") dispatch(fetchUserProfile(user.id));
  }, [dispatch, user, state]);

  useEffect(() => {
    if (user && state === "loaded" && !user_name) {
      onOpen();
    }
  }, [user, state, onOpen, user_name]);

  return (
    <>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("userName.modalTitle")}</ModalHeader>
          <ModalBody>
            <DescriptionText fontWeight="bold" mb="4">
              {t("userName.description")}
            </DescriptionText>
            <Formik
              initialValues={{ name: "" }}
              validationSchema={object({
                name: string().required(t("userName.required")),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                const { error } = await supabaseClient
                  .from("user_profiles")
                  .update({ user_name: values.name })
                  .eq("user_id", user_id);

                if (!error) {
                  dispatch(setUserName(values.name));
                  setSubmitting(false);
                  onClose();
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormField
                    name="name"
                    isRequired
                    label={t("userName.label")}
                  />
                  <Button
                    colorScheme="blue"
                    type="submit"
                    my="4"
                    w="full"
                    isLoading={isSubmitting}
                  >
                    {t("userName.submit")}
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
