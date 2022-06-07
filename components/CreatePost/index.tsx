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
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Send } from "icons";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "store/user";
import { definitions } from "types/supabase";
import { PostForm } from "./components";

export default function CreatePost() {
  const { t } = useTranslation("common");

  const { user_id } = useSelector(getUserProfile);

  const [files, setFiles] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [text, setText] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const imageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files || event.target.files.length < 1) {
      return;
    }

    setFiles((files) => files.concat(Array.from(event.target.files || [])));

    for (let i = 0; i < event.target.files.length; i++) {
      const name = event.target.files[i].name;
      const reader = new FileReader();

      reader.onload = () => {
        setImages((images) => [...images, { name, data: reader.result }]);
      };

      reader.readAsDataURL(event.target.files[i]);
    }
  };

  const removeImage = (index: number) => {
    setImages((images) => images.filter((_, i) => i !== index));
    setFiles((files) => files.filter((_, i) => i !== index));
  };

  const createPost = async () => {
    const { data: postData, error: postError } = await supabaseClient
      .from<definitions["user_posts"]>("user_posts")
      .insert({ user_id, text_content: text, media_content: [] });

    if (postError || !postData) throw postError;

    let uploadedImages: any[] = [];

    Array.from(files).forEach(async (file) => {
      uploadedImages.push(
        supabaseClient.storage
          .from("posts")
          .upload(`${user_id}/${postData[0].id}/${file.name}`, file)
      );
    });

    uploadedImages = await Promise.all(uploadedImages);

    const keys = uploadedImages.map((img) => img.data.Key);
    await supabaseClient
      .from<definitions["user_posts"]>("user_posts")
      .update({ media_content: keys })
      .eq("id", postData[0].id);
  };

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
            <PostForm
              images={images}
              text={text}
              setText={setText}
              imageUpload={imageUpload}
              removeImage={removeImage}
            />
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={createPost}>
                Save
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
