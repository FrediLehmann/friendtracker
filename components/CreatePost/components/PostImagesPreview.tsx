import { AspectRatio, Box, Flex, Image } from "@chakra-ui/react";
import { Image as ImageIcon, X } from "icons";
import { useState } from "react";

function PreviewElement({
  index,
  name,
  data,
  remove,
}: {
  index: number;
  name: string;
  data: string;
  remove: (index: number) => void;
}) {
  return (
    <AspectRatio w="72px" ratio={4 / 5}>
      <>
        <Image
          src={data}
          alt={name}
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
          background="blackAlpha.600"
          _hover={{ background: "blackAlpha.700" }}
          onClick={() => remove(index)}
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
  );
}

export default function PostImagesPreview({
  images,
  remove,
}: {
  images: {
    name: string;
    data: string;
  }[];
  remove: (index: number) => void;
}) {
  const [hideToManyImages, setHideToManyImages] = useState(true);

  const getImages = () => {
    if (images.length <= 10 || !hideToManyImages) {
      return images.map((img, index) => (
        <PreviewElement
          key={index}
          index={index}
          name={img.name}
          data={img.data}
          remove={remove}
        />
      ));
    }

    return (
      <>
        {images.slice(0, 9).map((img, index) => (
          <PreviewElement
            key={index}
            index={index}
            name={img.name}
            data={img.data}
            remove={remove}
          />
        ))}
        <Box
          as="button"
          w="72px"
          color="white"
          fontWeight="bold"
          borderRadius="sm"
          background="blackAlpha.600"
          _hover={{ background: "blackAlpha.700" }}
          onClick={() => setHideToManyImages(false)}
        >
          {images.length - 9}+
        </Box>
      </>
    );
  };

  return (
    <Flex gap="10px" mb="4" wrap="wrap">
      {getImages()}
    </Flex>
  );
}
