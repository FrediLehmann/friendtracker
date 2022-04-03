import { Container } from "@chakra-ui/react";
import { Header } from "./components";

export default function PageFrame({
  size = "default",
  children,
}: {
  size?: "default" | "small";
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Container
        as="main"
        mt={["2", "8", "10"]}
        mb={["6", "8", "12"]}
        maxW={size === "small" ? "96" : "container.lg"}
      >
        {children}
      </Container>
    </>
  );
}
