import React, { Component } from "react";
import { Provider } from "react-redux";
import { configureStore } from "utils";
import { ThemeProvider } from "styled-components";
import Navigation from "navigation";
import { Localization, AppLoading } from "expo";
import strings from "languages";
import { theme } from "theme";
import i18n from "i18n-js";
import { StatusBar, AsyncStorage } from "react-native";
import firebase from "firebase";
import { config } from "constants";
import axios from "axios";

i18n.fallbacks = true;
i18n.translations = strings;
i18n.locale = Localization.locale;

interface State {
  isReady: boolean;
  isAuthorized: boolean;
}

export default class App extends Component<void, State> {
  state = { isReady: false, isAuthorized: false };

  componentDidMount() {
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.setAuthHeaders(user);
      } else {
        await AsyncStorage.clear();
      }

      this.setState({ isReady: true, isAuthorized: !!user });
    });
  }

  setAuthHeaders(user: firebase.User) {
    axios.interceptors.request.use(
      async config => {
        config.headers.token = await user.getIdToken();
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  render() {
    const store = configureStore();

    if (!this.state.isReady) return <AppLoading />;

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <>
            <StatusBar barStyle="light-content" />
            <Navigation isAuthenticated={this.state.isAuthorized} />
          </>
        </ThemeProvider>
      </Provider>
    );
  }
}
