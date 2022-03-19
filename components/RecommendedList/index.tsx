import { Box, Heading } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Recommended from "./Recommended";

export default function RecommendedList() {
  const { t } = useTranslation("friends");
  return (
    <Box
      as="aside"
      layerStyle="card"
      bg="white"
      minW="max-content"
      h="min-content"
    >
      <Heading as="h3" size="xs" mb="3">
        {t("recommendedFriends.title")}
      </Heading>
      <Recommended name="Louis Henrich" />
      <Recommended name="Pascal Mattenberger" />
      <Recommended name="Niklaus Maurer" />
      <Recommended name="Victor Nguyen" />
    </Box>
  );
}
