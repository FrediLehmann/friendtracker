import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const NavItem = ({
  href,
  icon,
  text,
}: {
  href: string;
  icon: JSX.Element;
  text: string;
}) => {
  const router = useRouter();
  return (
    <Flex
      as="button"
      pl="14"
      py="3"
      color="gray.700"
      alignItems="center"
      onClick={() => router.push(href)}
      _hover={{ cursor: "pointer", bg: "gray.100" }}
      _focus={{
        outline: "2px solid transparent",
        outlineOffset: "2px",
        boxShadow: "var(--chakra-shadows-outline)",
      }}
    >
      {icon}
      <Text fontSize="md" ml="5">
        {text}
      </Text>
    </Flex>
  );
};

export default NavItem;
