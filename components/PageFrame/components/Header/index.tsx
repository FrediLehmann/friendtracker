import { Container, Flex } from "@chakra-ui/react";
import { Info, Language, LogoSection, Menu } from "./components";

const Header = () => {
  return (
    <Container
      as="header"
      maxW="container.xl"
      py={["2", "4"]}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <LogoSection />
      <Flex as="section">
        <Info />
        <Language />
        <Menu />
      </Flex>
    </Container>
  );
};

export default Header;
