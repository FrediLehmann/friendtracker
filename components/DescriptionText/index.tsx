import { chakra, Text } from "@chakra-ui/react";

function DescriptionText({ children, ...props }: { children: any }) {
  return (
    <Text color="gray.600" fontSize={["sm", null, "md"]} {...props}>
      {children}
    </Text>
  );
}

export default chakra(DescriptionText);
