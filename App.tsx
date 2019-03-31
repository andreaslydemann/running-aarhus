import React, { Component } from "react";
import { Provider } from "react-redux";
import { configureStore } from "./src/store";
import { ThemeProvider } from "styled-components";
import Navigator from "navigation/Navigator";
import { Localization, AppLoading } from "expo";
import strings from "languages";
import { theme } from "theme";
import i18n from "i18n-js";
import { StatusBar, AsyncStorage } from "react-native";
import firebase from "firebase";
import { config } from "constants/firebase_config";

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
      console.log("hello ", user);
      this.setState({ ...this.state, isAuthorized: !!user });

      if (!user) {
        await AsyncStorage.clear();
      }
    });

    this.bootstrap();
  }

  bootstrap = async () => {
    const userToken = await AsyncStorage.getItem("fb_token");
    this.setState({ isReady: true, isAuthorized: !!userToken });
  };

  render() {
    const store = configureStore();

    if (!this.state.isReady) return <AppLoading />;

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <>
            <StatusBar barStyle="light-content" />
            <Navigator isAuthenticated={this.state.isAuthorized} />
          </>
        </ThemeProvider>
      </Provider>
    );
  }
}
