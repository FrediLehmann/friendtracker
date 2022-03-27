import { Box, chakra } from "@chakra-ui/react";

function Card({ children, ...props }: { children: any }) {
  return (
    <Box
      px={["3", "5"]}
      py={["3", "4"]}
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.200"
      {...props}
    >
      {children}
    </Box>
  );
}

export default chakra(Card);
