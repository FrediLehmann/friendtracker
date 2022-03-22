import type { NextPage } from "next";
import useSession from "./useSession";

const withIsSignedIn = (
  Page: NextPage,
  { needsSignIn, redirectTo }: { needsSignIn: boolean; redirectTo: string }
) => {
  const HoC = (props: JSX.IntrinsicAttributes) => {
    const session = useSession();

    console.log(session);

    return <Page {...props} />;
  };

  HoC.displayName = `${needsSignIn ? "isSignedIn" : "isSignedOut"}(${
    Page.displayName || Page.name || "Page"
  })`;

  return HoC;
};

export default withIsSignedIn;
