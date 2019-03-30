import React from "react";
import { AsyncStorage, ActivityIndicator, StatusBar, View } from "react-native";

interface Props {
  navigation: { navigate: (screen: string) => void };
}

export default class AuthLoadingScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.bootstrap();
  }

  bootstrap = async () => {
    const userToken = await AsyncStorage.getItem("fb_token");
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar />
      </View>
    );
  }
}
