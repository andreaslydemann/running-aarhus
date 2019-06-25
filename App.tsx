import React, { Component } from "react";
import { Provider } from "react-redux";
import { configureStore } from "utils/configureStore";
import { ThemeProvider } from "styled-components";
import Navigation from "navigation";
import { AppLoading } from "expo";
import * as Localization from "expo-localization";
import { Asset } from "expo-asset";
import languages from "languages";
import { theme } from "theme";
import i18n from "i18n-js";
import { StatusBar, AsyncStorage, Image } from "react-native";
import firebase from "firebase";
import { FIREBASE_ACCOUNT } from "constants";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import axios from "axios";

i18n.fallbacks = true;
i18n.translations = languages;
i18n.locale = Localization.locale;

const store = configureStore();

interface State {
  isReady: boolean;
  isAuthorized: boolean;
}

function cacheImages(images: any) {
  return images.map((image: any) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends Component<void, State> {
  state = { isReady: false, isAuthorized: false };

  async componentDidMount() {
    await this.loadAssetsAsync();
    firebase.initializeApp(FIREBASE_ACCOUNT);

    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.setAuthHeaders(user);
      } else {
        await AsyncStorage.clear();
      }

      this.setState({ isReady: true, isAuthorized: !!user });
    });
  }

  async loadAssetsAsync() {
    const imageAssets = cacheImages([
      require("./assets/facebook-button.png"),
      require("./assets/runner.png"),
      require("./assets/icon.png")
    ]);

    await Promise.all([...imageAssets]);
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
    if (!this.state.isReady) return <AppLoading />;

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ActionSheetProvider>
            <>
              <StatusBar barStyle="light-content" />
              <Navigation isAuthenticated={this.state.isAuthorized} />
            </>
          </ActionSheetProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}
