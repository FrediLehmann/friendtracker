import { Box, Textarea, VisuallyHiddenInput } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { Image as ImageIcon } from "icons";
import { useState } from "react";
import PostImagesPreview from "./PostImagesPreview";

export default function PostForm() {
  const { t } = useTranslation("common");

  const [images, setImages] = useState<any[]>([]);

  const imageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length < 1) {
      return;
    }

    for (let i = 0; i < event.target.files.length; i++) {
      const name = event.target.files[i].name;
      const reader = new FileReader();

      reader.onload = () => {
        setImages((images) => [...images, { name, data: reader.result }]);
      };

      reader.readAsDataURL(event.target.files[i]);
    }
  };

  const removeImage = (name: string) => {
    setImages((images) => images.filter((img) => img.name !== name));
  };

  return (
    <>
      <PostImagesPreview images={images} remove={removeImage} />
      <Box
        as="button"
        display="flex"
        flexDirection="column"
        alignItems="center"
        p="6"
        w="full"
        color="gray.600"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        background="blackAlpha.50"
        _hover={{
          background: "blackAlpha.100",
        }}
        onClick={() =>
          (
            global.document.querySelector("#postMedia") as HTMLInputElement
          ).click()
        }
      >
        <ImageIcon boxSize="10" strokeWidth="1" />
        <span>{t("posts.selectImage")}</span>
      </Box>
      <VisuallyHiddenInput
        id="postMedia"
        name="postMedia"
        type="file"
        multiple
        accept="image/*"
        onChange={imageUpload}
      />
      <Textarea
        mt="4"
        placeholder={t("posts.postContentPlaceholder")}
        size="md"
      ></Textarea>
    </>
  );
}
