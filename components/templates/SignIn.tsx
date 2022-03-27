import { Flex } from "@chakra-ui/react";
import { Card, ExternalSignIn, SignInForm, Unregistered } from "components";

export default function SignIn() {
  return (
    <Flex flexDirection="column" gap={["3", "5"]}>
      <Card bg="gray.50">
        <SignInForm />
      </Card>
      <Card bg="gray.50">
        <ExternalSignIn />
      </Card>
      <Card fontSize="sm">
        <Unregistered />
      </Card>
    </Flex>
  );
}
