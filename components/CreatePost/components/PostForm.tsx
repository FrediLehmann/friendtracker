import { Box, Textarea, VisuallyHiddenInput } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { Image as ImageIcon } from "icons";
import PostImagesPreview from "./PostImagesPreview";

export default function PostForm({
  images,
  text,
  setText,
  imageUpload,
  removeImage,
}: {
  images: any[];
  text: string;
  setText: (_: string) => void;
  imageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}) {
  const { t } = useTranslation("common");

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
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></Textarea>
    </>
  );
}
