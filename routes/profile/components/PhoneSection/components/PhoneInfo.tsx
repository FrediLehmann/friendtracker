import {
  Box,
  Button,
  Flex,
  ListItem,
  Spacer,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Trash2 } from "icons";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { removePhoneNumber } from "store/user";

export default function PhoneInfo({ number }: { number: string }) {
  const { t } = useTranslation("profile");
  const dispatch = useDispatch();

  return (
    <Box layerStyle="card">
      <Flex flexDirection={["column", null, "row"]}>
        <Flex flexDirection={["column", null, "row"]}>
          <Text as="b" fontSize="md" isTruncated>
            {number}
          </Text>
        </Flex>
        <Spacer />
        <Button
          variant="outline"
          size="sm"
          mt={["2", null, "0"]}
          w="min-content"
          leftIcon={<Trash2 boxSize="4" />}
          onClick={() => dispatch(removePhoneNumber(number))}
        >
          {t("phoneSection.remove")}
        </Button>
      </Flex>
      <UnorderedList fontSize="sm" color="gray.600" mt="3" px="4">
        <ListItem>{t("emailSection.info.findable")}</ListItem>
        <ListItem>{t("emailSection.info.contact")}</ListItem>
      </UnorderedList>
    </Box>
  );
}
