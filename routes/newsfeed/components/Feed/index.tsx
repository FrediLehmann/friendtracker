import { VStack } from "@chakra-ui/react";
import { Post } from "./components";

export default function Feed() {
  return (
    <VStack spacing={[4]}>
      <Post
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
        posted="20 Minutes"
        poster="Some Name"
      />
      <Post
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
        posted="2 Days"
        poster="Some Other"
        images={[
          "/__mock__/christopher-czermak-7ybKmhDTcz0-unsplash.jpg",
          "/__mock__/caleb-miller-0Bs3et8FYyg-unsplash.jpg",
          "/__mock__/carlos-ibanez-oI141-aIwnQ-unsplash.jpg",
        ]}
      />
    </VStack>
  );
}
