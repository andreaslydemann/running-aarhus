import { Container } from "native-base";
import React from "react";
import i18n from "i18n-js";
import { ScreenTitle } from "components";

interface Props {
  navigation: { navigate: (screen: string) => void };
}

export default class ScheduleScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <Container style={{ paddingTop: 40, flex: 1 }}>
        <ScreenTitle title={i18n.t("scheduleTitle")} />
      </Container>
    );
  }
}
