import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Input,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

export default function PhoneInfo({ number }: { number: string }) {
  const { t } = useTranslation("profile");
  const smallSize = useBreakpointValue({ base: true, sm: false });
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.200"
      alignItems="center"
      w="full"
    >
      <Button size={smallSize ? "sm" : "md"} borderInlineEndRadius="0">
        {t("phoneSection.remove")}
      </Button>
      <Editable w="full" borderLeft="none" defaultValue={number} isTruncated>
        <EditablePreview px="4" />
        <Input
          as={EditableInput}
          py={["1", "2"]}
          fontSize={["sm", "md"]}
          borderInlineStartRadius="0"
        />
      </Editable>
    </Flex>
  );
}
