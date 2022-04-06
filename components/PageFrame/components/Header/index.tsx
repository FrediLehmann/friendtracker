import { Box, Container, Flex } from "@chakra-ui/react";
import { Info, Language, LogoSection, Menu } from "./components";

const Header = () => {
  return (
    <Box
      as="header"
      borderBottom="1px"
      borderColor="gray.200"
      position="sticky"
      top="0"
      background="white"
      zIndex="sticky"
    >
      <Container
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
    </Box>
  );
};

export default Header;
