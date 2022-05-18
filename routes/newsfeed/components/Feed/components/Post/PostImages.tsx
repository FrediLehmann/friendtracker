import { Center, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { Camera } from "icons";

export default function PostImages({ images }: { images: string[] }) {
  return (
    <>
      <Flex
        align="center"
        gap="2"
        position="absolute"
        left="2"
        top="2"
        bg="blackAlpha.700"
        py="1"
        px="2"
        color="whiteAlpha.900"
        borderRadius="md"
        opacity="0.8"
      >
        <Camera boxSize="5" />
        <Text fontWeight="bold">{images.length}</Text>
      </Flex>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="2fr 1fr"
        mb="4"
        gap="1"
      >
        <GridItem rowSpan={2}>
          <Image src={images[0]} alt="Image" objectFit="cover" height="100%" />
        </GridItem>
        <GridItem>
          <Image
            src={images[1] || ""}
            alt="Image"
            objectFit="cover"
            fallback={
              <Center h="full" bg="gray.100">
                <Camera boxSize="8" color="gray.600" />
              </Center>
            }
          />
        </GridItem>
        <GridItem>
          <Image
            src={images[2] || ""}
            alt="Image"
            objectFit="cover"
            fallback={
              <Center h="full" bg="gray.100">
                <Camera boxSize="8" color="gray.600" />
              </Center>
            }
          />
        </GridItem>
      </Grid>
    </>
  );
}
