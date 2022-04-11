import { Flex } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdditionalEmailAddresses,
  getAdditionalUserEmails,
  getAdditionalUserEmailsLoaded,
  getUserEmail,
  getUserProfile,
} from "store/user";
import { SectionHeading, SectionWrapper } from "..";
import { AddEmail, EmailInfo } from "./components";

export default function EmailSection() {
  const { t } = useTranslation(["profile", "common"]);

  const dispatch = useDispatch();
  const primaryEmail = useSelector(getUserEmail);
  const emails = useSelector(getAdditionalUserEmails);
  const emailsLoaded = useSelector(getAdditionalUserEmailsLoaded);
  const { state } = useSelector(getUserProfile);

  useEffect(() => {
    if (state === "loaded" && !emailsLoaded)
      dispatch(fetchAdditionalEmailAddresses());
  }, [dispatch, emailsLoaded, state]);

  return (
    <SectionWrapper mb={["8", "12"]}>
      <Flex alignItems="center">
        <SectionHeading>{t("emailSection.title")}</SectionHeading>
        <AddEmail />
      </Flex>
      <EmailInfo email={primaryEmail} isPrimary />
      {emails.map((email, index) => (
        <EmailInfo key={index} email={email} />
      ))}
    </SectionWrapper>
  );
}
