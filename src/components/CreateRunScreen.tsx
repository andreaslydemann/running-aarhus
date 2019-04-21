import React from "react";
import i18n from "i18n-js";
import { ScreenBackground, HeaderBack, TextInput } from "components/common";
import { styled } from "theme";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  navigation: {
    goBack: (nullArg?: null) => void;
    navigate: (screen: string) => void;
  };
}

export default class CreateRunScreen extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Wrapper>
        <HeaderBack
          navigateBack={() => this.props.navigation.goBack(null)}
          ScreenTitle={i18n.t("createRunTitle")}
          isModal={true}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("MapScreen")}
        >
          <TextInput
            inputText={"hello"}
            onChangeText={text => console.log(text)}
          />
          <Text>Open map</Text>
        </TouchableOpacity>
      </Wrapper>
    );
  }
}

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;
