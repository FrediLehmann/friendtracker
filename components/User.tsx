import {
  Alert,
  AlertDescription,
  AlertIcon,
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, getUserProfile, setUserHandle } from "store/user";
import DescriptionText from "./DescriptionText";
import { FormField } from "./Form";

export default function User({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation("common");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [handleTaken, setHandleTaken] = useState(false);

  const { user } = useUser();

  const dispatch = useDispatch();
  const { state, owner, user_handle } = useSelector(getUserProfile);

  useEffect(() => {
    if (user && state === "init") dispatch(fetchUserProfile(user.id));
  }, [dispatch, user, state]);

  useEffect(() => {
    if (user && state === "loaded" && !user_handle) {
      onOpen();
    }
  }, [user, state, onOpen, user_handle]);

  return (
    <>
      {children}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("handle.modalTitle")}</ModalHeader>
          <ModalBody>
            <DescriptionText fontWeight="bold" mb="4">
              {t("handle.description")}
            </DescriptionText>
            <Formik
              initialValues={{ handle: "" }}
              validate={async (values) => {
                let errors;
                if (!values.handle) {
                  errors = { handle: t("handle.required") };
                } else if (values.handle.length < 5) {
                  errors = { handle: t("handle.minLength") };
                } else if (/[^A-Za-z0-9]+/.test(values.handle)) {
                  errors = { handle: t("handle.onlyAlphabeteAndNumber") };
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setHandleTaken(false);
                const { error } = await supabaseClient
                  .from("profiles")
                  .update({ user_handle: values.handle })
                  .eq("owner", owner);

                if (!error) {
                  dispatch(setUserHandle(values.handle));
                  setSubmitting(false);
                  onClose();
                  return;
                } else {
                  setHandleTaken(true);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormField
                    name="handle"
                    isRequired
                    label={t("handle.label")}
                    helperText={t("handle.helper")}
                    helperPosition="before"
                  />
                  {handleTaken && (
                    <Alert status="error" mt="4">
                      <AlertIcon />
                      <AlertDescription>
                        {t("handle.alreadyTaken")}
                      </AlertDescription>
                    </Alert>
                  )}
                  <Button
                    colorScheme="blue"
                    type="submit"
                    my="4"
                    w="full"
                    isLoading={isSubmitting}
                  >
                    {t("handle.submit")}
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
