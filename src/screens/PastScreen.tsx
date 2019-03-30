import React from "react";
import i18n from "i18n-js";
import { ScreenTitle, ScreenBackground } from "components";
import { styled } from "theme";

interface Props {
  navigation: { navigate: (screen: string) => void };
}

export default class PastScreen extends React.Component<Props> {
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
  padding: 40px 0 0 0;
`;
