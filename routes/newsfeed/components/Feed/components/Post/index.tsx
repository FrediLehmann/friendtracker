import {
  Box,
  Divider,
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import PostActions from "./PostActions";
import PostCreator from "./PostCreator";
import PostImages from "./PostImages";

export default function Post({
  text,
  images,
  poster,
  posted,
}: {
  text: string;
  images?: string[];
  poster: string;
  posted: string;
}) {
  return (
    <Box layerStyle="card">
      <LinkBox>
        {images && images.length > 0 && <PostImages images={images} />}
        <Text noOfLines={3}>{text}</Text>
        <NextLink href="#" passHref>
          <LinkOverlay />
        </NextLink>
      </LinkBox>
      <Divider my="4" />
      <Flex justify="space-between">
        <PostCreator poster={poster} posted={posted} />
        <PostActions />
      </Flex>
    </Box>
  );
}
