import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  useBoolean,
} from "@chakra-ui/react";
import { DescriptionText } from "components";
import { Edit } from "icons";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserName, getUserProfile } from "store/user";

export default function NameInput() {
  const { t } = useTranslation("profile");
  const dispatch = useDispatch();
  const { user_name = "", user_handle } = useSelector(getUserProfile);
  const [edit, setEdit] = useBoolean();
  const [userName, setUserName] = useState(user_name);

  useEffect(() => {
    user_name && setUserName(user_name);
  }, [user_name]);

  async function submit(value: string) {
    setEdit.off();
    if (user_name === value) return;

    dispatch(changeUserName(value));
  }

  return (
    <Box ml={["6", "12"]} alignSelf="center">
      <Editable
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
      <DescriptionText>@{user_handle}</DescriptionText>
    </Box>
  );
}
