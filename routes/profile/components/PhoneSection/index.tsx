import { Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPhoneNumbers,
  getUserPhones,
  getUserPhonesLoaded,
  getUserProfile,
} from "store/user";
import { SectionHeading, SectionWrapper } from "..";
import { AddPhone, PhoneInfo } from "./components";

export default function PhoneSection() {
  const { t } = useTranslation(["profile", "common"]);

  const dispatch = useDispatch();
  const phonesLoaded = useSelector(getUserPhonesLoaded);
  const phones = useSelector(getUserPhones);
  const { state } = useSelector(getUserProfile);

  useEffect(() => {
    if (state === "loaded" && !phonesLoaded) dispatch(fetchPhoneNumbers());
  }, [state, phonesLoaded, dispatch]);

  return (
    <SectionWrapper>
      <Flex alignItems="center">
        <SectionHeading>{t("phoneSection.title")}</SectionHeading>
        <AddPhone />
      </Flex>
      <Text color="gray.500" fontSize={["sm", null, "md"]}>
        {t("phoneSection.description")}
      </Text>
      {phones.map((phone, index) => (
        <PhoneInfo key={index} number={phone} />
      ))}
    </SectionWrapper>
  );
}
