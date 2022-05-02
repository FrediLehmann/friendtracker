import { Flex, IconButton } from "@chakra-ui/react";
import { MoreHorizontal, Share2, ThumbsUp } from "icons";

export default function PostActions() {
  return (
    <Flex gap="1">
      <IconButton
        icon={<ThumbsUp boxSize="5" />}
        aria-label="like"
        variant="ghost"
      />
      <IconButton
        icon={<Share2 boxSize="5" />}
        aria-label="share"
        variant="ghost"
      />
      <IconButton
        icon={<MoreHorizontal boxSize="5" />}
        aria-label="more"
        variant="ghost"
      />
    </Flex>
  );
}
