import { AspectRatio, Box, Flex, Image } from "@chakra-ui/react";
import { Image as ImageIcon, X } from "icons";

export default function PostImagesPreview({
  images,
  remove,
}: {
  images: {
    name: string;
    data: string;
  }[];
  remove: (name: string) => void;
}) {
  return (
    <Flex gap="10px" mb="4" wrap="wrap">
      {images.map((img) => (
        <AspectRatio key={img.name} w="72px" ratio={4 / 5}>
          <>
            <Image
              src={img.data}
              alt={img.name}
              objectFit="cover"
              borderRadius="sm"
              fallback={
                <Box w="full" h="full" color="gray.600">
                  <ImageIcon boxSize="8" strokeWidth="1" />
                </Box>
              }
            />
            <Box
              as="button"
              display="flex"
              flexDirection="column"
              w="full"
              h="full"
              borderRadius="sm"
              color="white"
              background="blackAlpha.400"
              _hover={{ background: "blackAlpha.500" }}
              onClick={() => remove(img.name)}
            >
              <X
                position="absolute"
                right="2"
                top="2"
                boxSize="5"
                strokeWidth="3"
              />
            </Box>
          </>
        </AspectRatio>
      ))}
    </Flex>
  );
}
