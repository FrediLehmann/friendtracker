import { Box } from "@chakra-ui/react";
import { ExternalSignIn } from "components";

export default function ExternalSignInSection() {
  return (
    <Box
      as="section"
      w="full"
      mt={["3", "5"]}
      px={["3", "5"]}
      py={["3", "4"]}
      bg="gray.50"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.200"
    >
      <ExternalSignIn />
    </Box>
  );
}
