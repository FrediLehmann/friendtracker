import { chakra, Heading } from "@chakra-ui/react";

function SectionHeading({ children, ...props }: { children: React.ReactNode }) {
  return (
    <Heading as="h2" fontSize={["md", "lg"]} {...props}>
      {children}
    </Heading>
  );
}

export default chakra(SectionHeading);
