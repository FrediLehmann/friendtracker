import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { PostgrestError } from "@supabase/postgrest-js";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Search, UserPlus } from "icons";
import { useTranslation } from "next-i18next";
import { useReducer } from "react";
import SearchResult from "./SearchResult";

interface UserSearchResult {
  name: string;
  avatar: string;
  hash: string;
}

interface RootState {
  matches?: UserSearchResult[];
  query: string;
  isSearching: boolean;
  hasSearched: boolean;
  searchError: boolean;
}

const reducer = (
  state: RootState,
  action: {
    type: string;
    value?: UserSearchResult[] | string | boolean;
  }
) => {
  switch (action.type) {
    case "query":
      return { ...state, query: action.value as string };
    case "toggleSearch":
      return { ...state, isSearching: !state.isSearching };
    case "toggleError":
      return { ...state, searchError: !state.searchError };
    case "toggleHasSearched":
      return { ...state, hasSearched: action.value as boolean };
    case "updateMatches":
      return {
        ...state,
        matches: action.value as UserSearchResult[],
      };
    case "resetSearch":
      return initialState;
    default:
      return state;
  }
};

const initialState: RootState = {
  matches: [],
  query: "",
  isSearching: false,
  hasSearched: false,
  searchError: false,
};

export default function AddFriend() {
  const { t } = useTranslation("friends");
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchMatches = async () => {
    dispatch({ type: "toggleSearch" });
    dispatch({ type: "toggleHasSearched", value: false });

    try {
      const { data, error } = await supabaseClient.rpc("get_users", {
        query: state.query,
      });

      if (error || !data) throw error;

      state.searchError && dispatch({ type: "toggleError" });
      dispatch({ type: "updateMatches", value: data });
      dispatch({ type: "toggleHasSearched", value: true });
    } catch (e) {
      if ((e as PostgrestError).code === "401") {
        supabaseClient.auth.refreshSession();
        fetchMatches();
        return;
      }

      dispatch({ type: "toggleError" });
    } finally {
      dispatch({ type: "toggleSearch" });
    }
  };

  const resetSearch = () => {
    dispatch({ type: "resetSearch" });
  };

  return (
    <Box layerStyle="card" mb="6" bg="white">
      <Heading as="h2" size="sm" mb="2">
        {t("addFriend.title")}
      </Heading>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <UserPlus color="gray.300" boxSize="4" />
        </InputLeftElement>
        <Input
          value={state.query}
          onChange={(e) => dispatch({ type: "query", value: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              fetchMatches();
            }
          }}
          placeholder={t("addFriend.inputPlaceholder")}
        />
      </InputGroup>
      <Button
        colorScheme="blue"
        size="sm"
        mt="3"
        leftIcon={<Search boxSize="4" />}
        onClick={fetchMatches}
      >
        {t("addFriend.search")}
      </Button>
      {state.isSearching && (
        <Center mt="5">
          <Spinner />
        </Center>
      )}
      {!state.isSearching && state.matches && state.matches.length > 0 && (
        <Box mt="5">
          {state.matches.map((match, index) => (
            <SearchResult
              key={index}
              name={match.name}
              avatarUrl={match.avatar}
              userHash={match.hash}
              resetSearch={resetSearch}
            />
          ))}
        </Box>
      )}
      {state.hasSearched && state.matches && state.matches.length < 1 && (
        <Center mt="5">
          <Text color="gray.600">No results found</Text>
        </Center>
      )}
    </Box>
  );
}
