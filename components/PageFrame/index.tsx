import { Container } from "@chakra-ui/react";

export default function PageFrame({
  size = "default",
  children,
}: {
  size?: "default" | "small";
  children: React.ReactNode;
}) {
  return (
    <Container
      as="main"
      mt={["2", "8", "10"]}
      mb={["6", "8", "12"]}
      maxW={size === "small" ? "96" : "container.lg"}
    >
      {children}
    </Container>
  );
}
