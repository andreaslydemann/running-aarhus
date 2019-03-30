import React from "react";
import { ThemeProvider } from "styled-components";
import Navigator from "navigation/Navigator";
import i18n from "i18n-js";
import { Localization } from "expo";
import strings from "languages";
import { theme } from "theme";

i18n.fallbacks = true;
i18n.translations = strings;
i18n.locale = Localization.locale;

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navigator />
    </ThemeProvider>
  );
};

export default Root;
