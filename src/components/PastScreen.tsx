import React from "react";
import i18n from "i18n-js";
import { ScreenTitle, ScreenBackground } from "components/common";
import { styled } from "theme";
//import firebase from "firebase";

interface Props {
  navigation: { navigate: (screen: string) => void };
}

export default class PastScreen extends React.Component<Props> {
  /*async componentDidMount() {
      const user = firebase.auth().currentUser;
      if (user) {
        const token = await user.getIdToken();
        console.log(token);
      }
    }*/

  render(): JSX.Element {
    return (
      <Wrapper>
        <ScreenTitle title={i18n.t("pastTitle")} />
      </Wrapper>
    );
  }
}

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 44px 0 0 0;
`;
