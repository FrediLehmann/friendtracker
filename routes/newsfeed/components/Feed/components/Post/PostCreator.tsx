import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { Avatar } from "components";
import NextLink from "next/link";

export default function PostCreator({
  poster,
  posted,
}: {
  poster: string;
  posted: string;
}) {
  return (
    <Flex align="center" gap="2">
      <Avatar name={poster} size="sm" />
      <Box>
        <NextLink href="#" passHref>
          <Link fontSize="sm" fontWeight="bold">
            {poster}
          </Link>
        </NextLink>
        <Text fontSize="xs" color="gray.500">
          {posted}
        </Text>
      </Box>
    </Flex>
  );
}
