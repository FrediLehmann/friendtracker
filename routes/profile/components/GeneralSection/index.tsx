import { Flex } from "@chakra-ui/react";
import { SectionWrapper } from "..";
import { AvatarUpload, NameInput } from "./components";

export default function GeneralSection() {
  return (
    <SectionWrapper mb={["8", "12"]} mt={["6", "10"]}>
      <Flex>
        <AvatarUpload />
        <NameInput />
      </Flex>
    </SectionWrapper>
  );
}
