import { Box } from "@chakra-ui/react";
import { Unregistered } from "components";

export default function RegisterSection() {
  return (
    <Box
      as="section"
      w="full"
      mt={["3", "5"]}
      px={["3", "5"]}
      py={["3", "4"]}
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.200"
      fontSize="sm"
    >
      <Unregistered />
    </Box>
  );
}
