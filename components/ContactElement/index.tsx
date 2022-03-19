import {
  Box,
  Flex,
  Text,
  Tooltip,
  useBreakpointValue,
  useClipboard,
} from "@chakra-ui/react";
import { Mail, Phone } from "components/Icons";
import { useTranslation } from "next-i18next";

export default function ContactElement({
  type,
  text,
}: {
  type: "phone" | "email";
  text: string;
}) {
  const { t } = useTranslation("common");
  const { hasCopied, onCopy } = useClipboard(text);
  const iconSize = useBreakpointValue({ base: "4", sm: "6" });

  return (
    <Tooltip
      label={hasCopied ? t("copied") : t("copy")}
      closeOnClick={false}
      placement="bottom-start"
    >
      <Flex
        layerStyle="card"
        align="center"
        _hover={{ bg: "gray.100", cursor: "pointer" }}
        onClick={onCopy}
      >
        <Text fontSize={["sm", "md"]} isTruncated>
          {(() => {
            switch (type) {
              case "phone":
                return <Phone color="gray.600" boxSize={iconSize} mr="2" />;
              case "email":
                return <Mail color="gray.600" boxSize={iconSize} mr="2" />;
              default:
                return t("contact");
            }
          })()}
          {text}
        </Text>
      </Flex>
    </Tooltip>
  );
}
