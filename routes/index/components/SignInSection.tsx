import { Box } from "@chakra-ui/react";
import { SignInForm } from "components";

export default function SignInSection() {
  return (
    <Box
      as="section"
      w="full"
      px={["3", "5"]}
      py={["3", "4"]}
      bg="gray.50"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.200"
    >
      <SignInForm />
    </Box>
  );
}
