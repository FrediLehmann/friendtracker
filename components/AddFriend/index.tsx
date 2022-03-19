import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { UserPlus } from "components/Icons";
import { useTranslation } from "next-i18next";

export default function AddFriend() {
  const { t } = useTranslation("friends");
  return (
    <Box layerStyle="card" mb="6" bg="white">
      <Heading as="h2" size="sm" mb="2">
        {t("addFriend.title")}
      </Heading>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <UserPlus color="gray.300" boxSize="4" />
        </InputLeftElement>
        <Input placeholder={t("addFriend.inputPlaceholder")} />
      </InputGroup>
      <Button colorScheme="blue" size="sm" mt="3">
        {t("addFriend.addButton")}
      </Button>
    </Box>
  );
}
