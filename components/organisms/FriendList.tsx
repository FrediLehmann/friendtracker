import { Flex } from "@chakra-ui/react";
import { Friend, PendingFriend, UnavailableFriend } from "components";

export default function FriendList() {
  return (
    <Flex direction="column" gap="3">
      <Friend
        name="Hannes Kaufmann"
        url="hanneskaufmann"
        lastSignIn="24.03.2022"
        status="ok"
      />
      <Friend
        name="Wendy Nguyen"
        url="wendynguyen"
        lastSignIn="12.02.2022"
        status="ok"
      />
      <PendingFriend name="Markus Trachsel" url="markustrachsel" />
      <Friend
        name="Frederic Lehmann"
        url="fredericlehmann"
        lastSignIn="03.03.2022"
        status="nok"
      />
      <UnavailableFriend identifier="steffan.landgraf@smg.ch" />
    </Flex>
  );
}
