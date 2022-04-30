import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const LANGUAGES = [
  { locale: "en", flag: "🇬🇧", text: "English" },
  { locale: "de", flag: "🇩🇪", text: "Deutsch" },
];

export default function LanguageSelect() {
  const router = useRouter();
  const showText = useBreakpointValue({
    base: false,
    md: true,
  });

  const localeChange = (locale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale });
  };

  const currentLang =
    LANGUAGES.find((lang) => lang.locale === router.locale) || LANGUAGES[0];

  return (
    <Menu>
      <MenuButton as={Button} variant="outline">
        {currentLang.flag} {showText && currentLang.text}
      </MenuButton>
      <MenuList>
        {LANGUAGES.map((lang) => (
          <MenuItem key={lang.locale} onClick={() => localeChange(lang.locale)}>
            {lang.flag} {lang.text}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
