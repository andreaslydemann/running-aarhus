import React, { Component } from "react";
import { Provider } from "react-redux";
import { configureStore } from "./src/store";
import { ThemeProvider } from "styled-components";
import Navigator from "navigation/Navigator";
import { Localization } from "expo";
import strings from "languages";
import { theme } from "theme";
import i18n from "i18n-js";
import { StatusBar } from "react-native";

i18n.fallbacks = true;
i18n.translations = strings;
i18n.locale = Localization.locale;

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <>
            <StatusBar barStyle="light-content" />
            <Navigator />
          </>
        </ThemeProvider>
      </Provider>
    );
  }
}
