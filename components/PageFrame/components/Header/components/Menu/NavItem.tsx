import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const NavItem = ({
  href,
  icon,
  text,
  onClick,
}: {
  href?: string;
  icon: JSX.Element;
  text: string;
  onClick?: () => unknown;
}) => {
  const router = useRouter();

  const navigate = () => href && router.push(href);

  return (
    <Flex
      as="button"
      pl="14"
      py="3"
      color="gray.700"
      alignItems="center"
      onClick={onClick || navigate}
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
