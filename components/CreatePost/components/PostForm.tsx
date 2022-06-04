import { Textarea } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

export default function PostForm() {
  const { t } = useTranslation("common");
  return (
    <>
      <input type="file" />
      <Textarea
        placeholder={t("posts.postContentPlaceholder")}
        size="md"
      ></Textarea>
    </>
  );
}
