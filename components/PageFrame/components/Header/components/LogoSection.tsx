import { Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";
import NextLink from "next/link";

export default function LogoSection() {
  return (
    <LinkBox as="section">
      <Heading as="h1" fontSize={["sm", "md", "lg"]}>
        <NextLink href="/" passHref>
          <LinkOverlay>Friend Tracker</LinkOverlay>
        </NextLink>
      </Heading>
    </LinkBox>
  );
}
