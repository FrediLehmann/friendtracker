import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { PostgrestError } from "@supabase/postgrest-js";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Search, UserPlus } from "icons";
import { useTranslation } from "next-i18next";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "store/user";
import { definitions } from "types/supabase";
import SearchResult from "./SearchResult";

interface RootState {
  matches?: definitions["profiles"][];
  query: string;
  isSearching: boolean;
  searchError: boolean;
}

const reducer = (
  state: RootState,
  action: {
    type: string;
    value?: definitions["profiles"][] | string;
  }
) => {
  switch (action.type) {
    case "query":
      return { ...state, query: action.value as string };
    case "toggleSearch":
      return { ...state, isSearching: !state.isSearching };
    case "toggleError":
      return { ...state, searchError: !state.searchError };
    case "updateMatches":
      return { ...state, matches: action.value as definitions["profiles"][] };
    case "clearMatches":
      return { ...state, matches: [] };
    default:
      return state;
  }
};

const initialState: RootState = {
  matches: [],
  query: "",
  isSearching: false,
  searchError: false,
};

export default function AddFriend() {
  const { t } = useTranslation("friends");
  const [state, dispatch] = useReducer(reducer, initialState);

  const { owner } = useSelector(getUserProfile);

  const fetchMatches = async () => {
    dispatch({ type: "toggleSearch" });

    try {
      const { data, error } = await supabaseClient
        .from<definitions["profiles"]>("profiles")
        .select()
        .not("owner", "eq", owner)
        .textSearch("user_name", state.query);

      if (error) throw error;

      state.searchError && dispatch({ type: "toggleError" });
      dispatch({ type: "updateMatches", value: data });
    } catch (e) {
      console.log(e);
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

  return (
    <Box layerStyle="card" mb="6" bg="white">
      <Heading as="h2" size="sm" mb="2">
        {t("addFriend.title")}
      </Heading>
      <Popover
        isOpen={state.matches && state.matches.length > 0}
        onClose={() => dispatch({ type: "clearMatches" })}
        placement="bottom-start"
        matchWidth
      >
        <PopoverTrigger>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <UserPlus color="gray.300" boxSize="4" />
            </InputLeftElement>
            <Input
              value={state.query}
              onChange={(e) =>
                dispatch({ type: "query", value: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  fetchMatches();
                }
              }}
              placeholder={t("addFriend.inputPlaceholder")}
            />
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent boxShadow="md">
          <PopoverCloseButton />
          <PopoverBody>
            {state.matches &&
              state.matches.map((match) => (
                <SearchResult
                  key={match.owner}
                  name={match.user_name}
                  avatarUrl={match.avatar_url}
                />
              ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Button
        colorScheme="blue"
        size="sm"
        mt="3"
        leftIcon={<Search boxSize="4" />}
        onClick={fetchMatches}
        isLoading={state.isSearching}
      >
        {t("addFriend.search")}
      </Button>
    </Box>
  );
}
