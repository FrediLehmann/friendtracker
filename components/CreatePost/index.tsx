import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Send } from "icons";
import { useTranslation } from "next-i18next";
import { PostForm } from "./components";

export default function CreatePost() {
  const { t } = useTranslation("common");

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        rightIcon={<Send boxSize="5" />}
        mr="4"
        variant="outline"
      >
        {t("posts.createPost")}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("posts.createPost")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PostForm />
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
