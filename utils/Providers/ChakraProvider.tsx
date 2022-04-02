import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  layerStyles: {
    card: {
      px: ["3", "5"],
      py: ["3", "4"],
      borderWidth: "1px",
      borderRadius: "lg",
      borderColor: "gray.200",
    },
    pageContainer: {
      mt: ["2", "8", "10"],
      mb: ["6", "8", "12"],
    },
    pageContent: {
      bg: ["wihte", "gray.50"],
      py: ["0", "5"],
      px: ["0", "6"],
    },
  },
  textStyles: {
    descriptiveText: {
      color: "gray.500",
      fontSize: ["sm", null, "md"],
    },
  },
});

export default function Provider({ children }: { children: JSX.Element }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
