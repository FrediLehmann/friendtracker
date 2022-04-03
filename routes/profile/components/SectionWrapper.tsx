import { chakra, VStack } from "@chakra-ui/react";

function SectionWrapper({ children, ...props }: { children: React.ReactNode }) {
  return (
    <VStack as="section" align="stretch" spacing="4" {...props}>
      {children}
    </VStack>
  );
}

export default chakra(SectionWrapper);
