import {
  Editable,
  EditableInput,
  EditablePreview,
  useBoolean,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Edit } from "icons";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "store/user";

export default function NameInput() {
  const { t } = useTranslation("profile");
  const { owner = "", user_name = "" } = useSelector(getUserProfile);
  const [edit, setEdit] = useBoolean();
  const [userName, setUserName] = useState(user_name);

  useEffect(() => {
    user_name && setUserName(user_name);
  }, [user_name]);

  async function submit(value: string) {
    setEdit.off();
    if (user_name === value) return;
    if (!owner) throw new Error("No profile or owner");

    let { error } = await supabaseClient
      .from("profiles")
      .update({ user_name: value })
      .eq("owner", owner);

    if (error) throw new Error("Could not save user name");
  }

  return (
    <Editable
      ml={["6", "12"]}
      fontSize={["md", "xl", "2xl"]}
      fontWeight="semibold"
      placeholder={t("nameSection.edit")}
      alignSelf="center"
      value={userName}
      onChange={(value) => setUserName(value)}
      onSubmit={submit}
      onEdit={setEdit.on}
    >
      <EditablePreview />
      <EditableInput />
      {!edit && (
        <Edit
          boxSize={["4", "5", "6"]}
          ml="2"
          mt="-0.25rem"
          _hover={{ cursor: "text" }}
        />
      )}
    </Editable>
  );
}
