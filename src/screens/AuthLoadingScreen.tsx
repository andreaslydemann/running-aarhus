import React from "react";
import { AsyncStorage, ActivityIndicator, View } from "react-native";
import { FACEBOOK_TOKEN } from "constants";

interface Props {
  navigation: { navigate: (screen: string) => void };
}

export default class AuthLoadingScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.bootstrap();
  }

  bootstrap = async () => {
    const userToken = await AsyncStorage.getItem(FACEBOOK_TOKEN);
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}
